import { Component, Inject, forwardRef, ViewChild } from '@angular/core';
import { BaseWidget, NgAisInstantSearch } from 'angular-instantsearch';
import { connectRange } from 'instantsearch.js/es/connectors';
import * as noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.min.css';

type PriceSliderState = {
  range: { min: number; max: number };
  refine: Function;
  start: number[];
};

@Component({
  selector: 'app-price-slider',
  template: `
    <div [class]="cx()">
      <div #sliderContainer></div>
    </div>
  `,
})
export class PriceSlider extends BaseWidget {
  @ViewChild('sliderContainer') public sliderContainer: any;
  public state: PriceSliderState = {
    range: { min: 0, max: 1 },
    refine: () => {},
    start: [0, 1],
  };
  private precision = 0;
  private slider: any;

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent
  ) {
    super('PriceSlider');
    this.createWidget(connectRange, {
      // instance options
      attribute: 'price',
    });
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
        step: 1,
        tooltips: [{ to: this.formatTooltip }, { to: this.formatTooltip }],
      };

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
    return value.toFixed(this.precision);
  };
}
