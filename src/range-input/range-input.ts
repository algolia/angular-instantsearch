import { Inject, Component, Input, forwardRef, Optional } from '@angular/core';

import { connectRange } from 'instantsearch.js/es/connectors';
import {
  RangeConnectorParams,
  RangeWidgetDescription,
  RangeRenderState,
} from 'instantsearch.js/es/connectors/range/connectRange';

import { TypedBaseWidget } from '../typed-base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { NgAisIndex } from '../index-widget/index-widget';
import { parseNumberInput, noop } from '../utils';

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
export class NgAisRangeInput extends TypedBaseWidget<
  RangeWidgetDescription,
  RangeConnectorParams
> {
  // rendering options
  @Input() public currency: string = '$';
  @Input() public separator: string = 'to';
  @Input() public submitLabel: string = 'Go';

  // instance options
  @Input() public attribute: RangeConnectorParams['attribute'];
  @Input() public min?: RangeConnectorParams['min'];
  @Input() public max?: RangeConnectorParams['max'];
  @Input() public precision?: RangeConnectorParams['precision'] = 0;

  // inner state
  public minInputValue?: number;
  public maxInputValue?: number;

  get step() {
    const precision = parseNumberInput(this.precision);
    return 1 / Math.pow(10, precision);
  }

  get canRefine() {
    return this.state.range.min !== this.state.range.max;
  }

  public state: RangeRenderState = {
    range: { min: undefined, max: undefined },
    refine: noop,
    start: [0, 0],
    // TODO: use canRefine & format
    canRefine: false,
    format: {
      from: () => '',
      to: () => '',
    },
    sendEvent: undefined,
  };

  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
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

  public handleSubmit(event: Event) {
    event.preventDefault();
    this.state.refine([this.minInputValue, this.maxInputValue]);
  }
}
