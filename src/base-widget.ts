import { Input, OnDestroy, OnInit } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { noop } from "lodash-es";

import { NgAisInstance } from "./instantsearch/instantsearch-instance";
import { bem } from "./utils";

export class Widget {
  public init: () => void;
  public getConfiguration: () => object;
  public render: (
    params: {
      templatesConfig: object;
      state: object;
      results: {}[];
      createURL: (value: any) => string;
      instantSearchInstance: object;
    }
  ) => void;
  public dispose: (
    params: {
      helper: object;
      state: object;
    }
  ) => object | void;
}

export type Connector = (
  renderFn: (state: object, isFirstRendering: boolean) => void,
  unmountFn: () => void
) => (widgetOptions?: object) => Widget;

export class BaseWidget implements OnInit, OnDestroy {
  // ssr platformId
  public plateformId: Object;

  // header footer
  @Input() public header?: string;
  @Input() public footer?: string;

  public widget?: Widget;
  public state?: object = {};
  public cx?: Function;

  constructor(private searchInstance: NgAisInstance, widgetName: string) {
    this.cx = bem(widgetName);
  }

  public createWidget(connector: Connector, options: object = {}) {
    this.widget = connector(this.updateState, noop)(options);
  }

  public ngOnInit() {
    this.searchInstance.addWidget(this.widget);
  }

  public ngOnDestroy() {
    if (isPlatformBrowser(this.plateformId)) {
      this.searchInstance.removeWidget(this.widget);
    }
  }

  public updateState = (
    state: {},
    isFirstRendering: boolean
  ): Promise<void> | void => {
    if (isFirstRendering) {
      return Promise.resolve().then(() => {
        this.state = state;
      });
    }

    this.state = state;
  };
}
