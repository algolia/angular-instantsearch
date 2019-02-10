import { Component, Input, ViewChild, Inject, forwardRef } from '@angular/core';

import { connectRange } from 'instantsearch.js/es/connectors';
import * as noUiSlider from 'nouislider';

import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { parseNumberInput, noop } from '../utils';

export type RangeSliderState = {
  range: { min: number; max: number };
  refine: Function;
  start: number[];
};

@Component({
  selector: 'ais-range-slider',
  template: `
    <div [class]="cx()">
      <div [class]="cx('body')">
        <div #sliderContainer></div>
      </div>
    </div>
  `,
})
export class NgAisRangeSlider extends BaseWidget {
  @ViewChild('sliderContainer') public sliderContainer: any;

  // render options
  @Input() public pips: boolean = true;
  @Input() public tooltips: boolean = true;

  // connector options
  @Input() public attribute: string;
  @Input() public min?: number;
  @Input() public max?: number;
  @Input() public precision?: number = 2;

  public state: RangeSliderState = {
    range: { min: 0, max: 1 },
    refine: noop,
    start: [0, 1],
  };

  private slider: any;

  get step() {
    // compute step from the precision value
    const precision = parseNumberInput(this.precision) || 2;
    return 1 / Math.pow(10, precision);
  }

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent: any
  ) {
    super('RangeSlider');
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

  public updateState = (state, isFirstRendering: boolean) => {
    if (isFirstRendering) {
      // create slider
      const config = {
        animate: false,
        behaviour: 'snap',
        connect: true,
        range: { min: 0, max: 1 },
        start: [0, 1],
        step: this.step,
        tooltips: this.tooltips && [
          { to: this.formatTooltip },
          { to: this.formatTooltip },
        ],
      };

      if (this.pips === true || typeof this.pips === 'undefined') {
        Object.assign(config, {
          pips: {
            density: 3,
            mode: 'positions',
            stepped: true,
            values: [0, 50, 100],
          },
        });
      } else if (this.pips !== undefined) {
        Object.assign(config, { pips: this.pips });
      }

      this.slider = noUiSlider.create(
        this.sliderContainer.nativeElement,
        config
      );

      // register listen events
      this.sliderContainer.nativeElement.noUiSlider.on(
        'change',
        this.handleChange
      );
    }

    // update component inner state
    this.state = state;

    // update the slider state
    const {
      range: { min, max },
      start,
    } = state;

    const disabled = min === max;
    const range = disabled ? { min, max: max + 0.0001 } : { min, max };

    this.slider.updateOptions({ disabled, range, start });
  };

  public handleChange = (values: string[] | number[]) => {
    this.state.refine(values);
  };

  public formatTooltip = (value: number) => {
    return value.toFixed(parseNumberInput(this.precision));
  };
}
