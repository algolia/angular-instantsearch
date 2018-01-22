import { Component, Input } from "@angular/core";
import { connectRange } from "instantsearch.js/es/connectors";
import { noop } from "lodash-es";

import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
import { parseNumberInput } from "../utils";

export type NumericRangeState = {
  range: { min?: number; max?: number };
  refine: Function;
  start: number[];
};

@Component({
  selector: "ng-ais-numeric-range",
  template: `
    <div [class]="cx()">
      <div [class]="cx('body')">
        <form
          [class]="cx('form')"
          (submit)="handleSubmit($event)"
          novalidate
        >
          <label [class]="cx('label')">
            <span [class]="cx('currency')">{{currency}} </span>
            <input
              [class]="cx('input')"
              type="number"
              [min]="state.range.min"
              [max]="state.range.max"
              [placeholder]="state.range.min"
              [value]="minInputValue"
              [step]="step"
              (change)="handleChange($event, 'min')"
            />
          </label>

          <span [class]="cx('separator')"> {{separator}} </span>

          <label [class]="cx('label')">
            <span [class]="cx('currency')">{{currency}} </span>
            <input
              [class]="cx('input')"
              type="number"
              [min]="state.range.min"
              [max]="state.range.max"
              [placeholder]="state.range.max"
              [value]="maxInputValue"
              [step]="step"
              (change)="handleChange($event, 'max')"
            />
          </label>

          <button
            [class]="cx('submit')"
            (click)="handleSubmit($event)"
          >
            {{submitLabel}}
          </button>
        </form>
      </div>
    </div>
  `
})
export class NgAisNumericRange extends BaseWidget {
  // render options
  @Input() public currency: string = "$";
  @Input() public separator: string = "to";
  @Input() public submitLabel: string = "Go";

  // connector options
  @Input() public attributeName: string;
  @Input() public min?: number | string;
  @Input() public max?: number | string;
  @Input() public precision?: number | string = 2;

  // inner state
  public minInputValue: number | string = "";
  public maxInputValue: number | string = "";

  get step() {
    return 1 / Math.pow(10, parseNumberInput(this.precision));
  }

  public state: NumericRangeState = {
    range: { min: undefined, max: undefined },
    refine: noop,
    start: [0, 0]
  };

  constructor(searchInstance: NgAisInstance) {
    super(searchInstance, "RangeSlider");
  }

  public ngOnInit() {
    this.createWidget(connectRange, {
      attributeName: this.attributeName,
      max: parseNumberInput(this.max),
      min: parseNumberInput(this.min),
      precision: parseNumberInput(this.precision)
    });

    super.ngOnInit();
  }

  public handleChange(event: any, type: string) {
    const value = parseNumberInput(event.target.value);

    if (type === "min") {
      this.minInputValue = value;
    } else {
      this.maxInputValue = value;
    }
  }

  public handleSubmit(event: MouseEvent | KeyboardEvent) {
    event.preventDefault();
    this.state.refine([this.minInputValue, this.maxInputValue]);
  }
}
