import { Component, Input, Inject, PLATFORM_ID } from "@angular/core";
import { connectNumericSelector } from "instantsearch.js/es/connectors";
import { noop } from "lodash-es";

import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";

export type NumericSelectorState = {
  currentRefinement?: string;
  options: {}[];
  refine: Function;
};

@Component({
  selector: "ng-ais-numeric-selector",
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
    @Inject(PLATFORM_ID) public platformId: Object,
    searchInstance: NgAisInstance
  ) {
    super(searchInstance, "NumericSelector");
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
