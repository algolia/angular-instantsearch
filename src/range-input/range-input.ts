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
    <div [ngClass]="[
        cx(), 
        !canRefine ? cx('', 'noRefinement') : ''
      ]">
      <form
        [class]="cx('form')"
        (submit)="handleSubmit($event)"
        novalidate
      >
        <label [class]="cx('label')">
          <span [class]="cx('currency')">{{currency}}</span>
          <input
            [ngClass]="[
              cx('input'),
              cx('input', 'min')
            ]"
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
            [ngClass]="[
              cx('input'),
              cx('input', 'max')
            ]"
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
  // rendering options
  @Input() public currency: string = '$';
  @Input() public separator: string = 'to';
  @Input() public submitLabel: string = 'Go';

  // instance options
  @Input() public attribute: string;
  @Input() public min?: number;
  @Input() public max?: number;
  @Input() public precision?: number = 0;

  // inner state
  public minInputValue?: number | string = '';
  public maxInputValue?: number | string = '';

  get step() {
    const precision = parseNumberInput(this.precision);
    return 1 / Math.pow(10, precision);
  }

  get canRefine() {
    return this.state.range.min !== this.state.range.max;
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
      max: parseNumberInput(this.max),
      min: parseNumberInput(this.min),
      precision: parseNumberInput(this.precision),
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
