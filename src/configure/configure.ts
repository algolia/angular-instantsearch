import { Component, Input, Inject, forwardRef } from "@angular/core";

import { connectConfigure } from "instantsearch.js/es/connectors";

import { BaseWidget } from "../base-widget";
import { NgAisInstantSearch } from "../instantsearch/instantsearch";

@Component({
  selector: "ais-configure",
  template: ""
})
export class NgAisConfigure extends BaseWidget {
  @Input() searchParameters: {} = {};

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent: any
  ) {
    super("Configure");
  }

  public ngOnInit() {
    this.createWidget(connectConfigure, {
      searchParameters: this.searchParameters
    });
    super.ngOnInit();
  }
}
