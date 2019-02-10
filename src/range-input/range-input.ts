import { Inject, Component, Input, forwardRef } from '@angular/core';

import { connectRange } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { parseNumberInput, noop } from '../utils';

export type NumericRangeState = {
  start: number[];
  range: { min?: number; max?: number };
  refine: Function;
};

@Component({
  selector: 'ais-range-input',
  template: `
    <div [class]="cx()">
      <form
        [class]="cx('form')"
        (submit)="handleSubmit($event)"
        novalidate
      >
        <label [class]="cx('label')">
          <span [class]="cx('currency')">{{currency}}</span>
          <input
            [class]="cx('input', 'min')"
            type="number"
            [min]="state.range.min"
            [max]="state.range.max"
            [placeholder]="state.range.min"
            [value]="minInputValue"
            [step]="step"
            (change)="handleChange($event, 'min')"
          />
        </label>

        <span [class]="cx('separator')">{{separator}}</span>

        <label [class]="cx('label')">
          <span [class]="cx('currency')">{{currency}}</span>
          <input
            [class]="cx('input', 'max')"
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
  `,
})
export class NgAisRangeInput extends BaseWidget {
  // render options
  @Input() public currency: string = '$';
  @Input() public separator: string = 'to';
  @Input() public submitLabel: string = 'Go';

  // connector options
  @Input() public attribute: string;
  @Input() public min?: number;
  @Input() public max?: number;
  @Input() public precision?: number = 2;

  // inner state
  public minInputValue?: number | string = '';
  public maxInputValue?: number | string = '';

  get step() {
    const precision = parseNumberInput(this.precision) || 2;
    return 1 / Math.pow(10, precision);
  }

  public state: NumericRangeState = {
    range: { min: undefined, max: undefined },
    refine: noop,
    start: [0, 0],
  };

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent: any
  ) {
    super('RangeInput');
  }

  public ngOnInit() {
    this.createWidget(connectRange, {
      attribute: this.attribute,
      max: this.max,
      min: this.min,
      precision: this.precision,
    });

    super.ngOnInit();
  }

  public handleChange(event: any, type: string) {
    const value = parseNumberInput(event.target.value);

    if (type === 'min') {
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
