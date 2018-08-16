import {
  Component,
  Input,
  Inject,
  forwardRef,
  KeyValueDiffer,
  KeyValueDiffers
} from "@angular/core";

import { connectConfigure } from "instantsearch.js/es/connectors";
import { BaseWidget } from "../base-widget";
import { NgAisInstantSearch, SearchParameters } from "../instantsearch/instantsearch";
import { noop } from "../utils";

@Component({
  selector: "ais-configure",
  template: ""
})
export class NgAisConfigure extends BaseWidget {

  private _searchParameters !: SearchParameters;
  private _differ !: KeyValueDiffer<string, any>; // SearchParameters

  public state: { refine: Function } = {
    refine: noop
  };

  constructor(
    private _differs: KeyValueDiffers,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent: any
  ) {
    super("Configure");
  }

  @Input()
  set searchParameters(values: SearchParameters) {
    this._searchParameters = values;
    if (!this._differ && values) {
      this._differ = this._differs.find(values).create();
    }
  }

  public ngOnInit() {
    this.createWidget(connectConfigure, {
      searchParameters: this._searchParameters
    });
    super.ngOnInit();
  }

  ngDoCheck() {
    if (this._differ) {
      const changes = this._differ.diff(this._searchParameters);
      if (changes) {
        this.state.refine(this._searchParameters);
      }
    }
  }
}
