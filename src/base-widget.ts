import { Input, OnDestroy, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { bem, noop } from './utils';

export class Widget {
  public init: (
    params: {
      templatesConfig: object;
      state: object;
      results: object[];
      createURL: (value: any) => string;
      instantSearchInstance: object;
    }
  ) => void;
  public getConfiguration?: () => object;
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
  public instantSearchParent: any;

  @Input() public autoHideContainer?: boolean;

  public widget?: Widget;
  public state?: object = {};
  public cx: Function;

  constructor(widgetName: string) {
    this.cx = bem(widgetName);
  }

  public createWidget(connector: Connector, options: object = {}) {
    this.widget = connector(this.updateState, noop)(options);
  }

  public ngOnInit() {
    // add widget to the InstantSearch Instance
    this.instantSearchParent.addWidget(this.widget);
  }

  public ngOnDestroy() {
    if (isPlatformBrowser(this.instantSearchParent.platformId)) {
      this.instantSearchParent.removeWidget(this.widget);
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

  // helper method for genering item list className
  public getItemClass(item: { isRefined?: boolean }) {
    let className = this.cx('item');

    if (item.isRefined) {
      className = `${className} ${this.cx('item', 'selected')}`;
    }

    return className;
  }
}
