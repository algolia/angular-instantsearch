import { Input, OnDestroy, OnInit } from "@angular/core";
import { noop } from "lodash";

import { NgAisInstance } from "./instantsearch/instantsearch-instance";

export class BaseWidget implements OnInit, OnDestroy {
  // header footer
  @Input() public header?: string;
  @Input() public footer?: string;

  public widget?: Widget;
  public state?: object;

  constructor(private searchInstance: NgAisInstance) {}

  public createWidget(connector: Connector, options: object = {}) {
    this.widget = connector(this.updateState, noop)(options);
  }

  public ngOnInit() {
    this.searchInstance.addWidget(this.widget);
  }

  public ngOnDestroy() {
    this.searchInstance.removeWidget(this.widget);
  }

  public updateState = (state, isFirstRendering): Promise<void> | void => {
    if (isFirstRendering) {
      return Promise.resolve().then(() => {
        this.state = state;
      });
    }

    this.state = state;
  };
}
