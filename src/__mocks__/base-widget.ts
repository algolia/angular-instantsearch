import { Input, OnDestroy, OnInit } from "@angular/core";
import { noop } from "lodash-es";

import { NgAisInstance } from "./instantsearch/instantsearch-instance";

export class BaseWidget implements OnInit, OnDestroy {
  // header footer
  @Input() public header?: string;
  @Input() public footer?: string;

  public widget?: Widget;
  public state?: object;

  constructor(private searchInstance: NgAisInstance) {}

  public createWidget(connector: Connector, options: object = {}) {
    // nothind to do, test env
  }

  public ngOnInit() {
    // nothind to do, test env
  }

  public ngOnDestroy() {
    // nothind to do, test env
  }

  public updateState = (state, isFirstRendering): Promise<void> | void => {
    this.state = state;
  };
}
