import {
  Component,
  Input,
  Inject,
  forwardRef,
  SimpleChanges
} from "@angular/core";

import { connectConfigure } from "instantsearch.js/es/connectors";
import { noop } from "lodash-es";

import { BaseWidget } from "../base-widget";
import { NgAisInstantSearch } from "../instantsearch/instantsearch";

@Component({
  selector: "ais-configure",
  template: ""
})
export class NgAisConfigure extends BaseWidget {
  @Input() searchParameters: {} = {};

  public state: { refine: Function } = {
    refine: noop
  };

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

  public ngOnChanges(changes: SimpleChanges) {
    if (!changes.searchParameters.isFirstChange) {
      this.state.refine(changes.searchParameters.currentValue);
    }
  }
}
