import { Component, Input, Inject, forwardRef } from "@angular/core";

import { connectNumericSelector } from "instantsearch.js/es/connectors";
import { BaseWidget } from "../base-widget";
import { NgAisInstantSearch } from "../instantsearch/instantsearch";
import { noop } from "../utils";

export type NumericSelectorState = {
  currentRefinement?: string | null;
  options: {}[];
  refine: Function;
};

@Component({
  selector: "ais-numeric-selector",
  template: `
    <div [class]="cx('')">
      <select
        [class]="cx('select')"
        (change)="state.refine($event.target.value)"
      >
        <option
          [class]="cx('option')"
          *ngFor="let item of state.options"
          [value]="item.value"
          [selected]="item.value === state.currentRefinement"
        >
          {{item.label}}
        </option>
      </select>
    </div>
  `
})
export class NgAisNumericSelector extends BaseWidget {
  // connector options
  @Input() public attribute: string;
  @Input() public operator: "<" | "<=" | "=" | ">=" | ">" | "!=" = "=";
  @Input()
  public items: {
    value: number;
    label: string;
  }[];

  public state: NumericSelectorState = {
    currentRefinement: null,
    options: [],
    refine: noop
  };

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent: any
  ) {
    super("NumericSelector");
  }

  public ngOnInit() {
    this.createWidget(connectNumericSelector, {
      attributeName: this.attribute,
      operator: this.operator,
      options: this.items
    });
    super.ngOnInit();
  }
}
