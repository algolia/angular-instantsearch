import {
  Component,
  Input,
  ViewChild,
  Inject,
  forwardRef,
  Optional,
} from '@angular/core';

import { connectRange } from 'instantsearch.js/es/connectors';
import * as noUiSlider from 'nouislider';

import { TypedBaseWidget } from '../typed-base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { NgAisIndex } from '../index-widget/index-widget';
import { parseNumberInput, noop } from '../utils';
import {
  RangeBoundaries,
  RangeConnectorParams,
  RangeWidgetDescription,
  RangeRenderState,
} from 'instantsearch.js/es/connectors/range/connectRange';

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
export class NgAisRangeSlider extends TypedBaseWidget<
  RangeWidgetDescription,
  RangeConnectorParams
> {
  @ViewChild('sliderContainer', { static: false })
  public sliderContainer: any;

  // rendering options
  @Input() public pips: boolean = true;
  @Input() public tooltips: boolean = true;

  // instance options
  @Input() public attribute: RangeConnectorParams['attribute'];
  @Input() public min?: RangeConnectorParams['min'];
  @Input() public max?: RangeConnectorParams['max'];
  @Input() public precision?: RangeConnectorParams['precision'];

  public state: RangeRenderState = {
    canRefine: false,
    format: {
      from: () => '',
      to: () => '',
    },
    range: { min: 0, max: 1 },
    refine: noop,
    start: [0, 1],
    sendEvent: noop,
  };

  private slider: any;

  get step() {
    // compute step from the precision value
    const precision = parseNumberInput(this.precision) || 2;
    return 1 / Math.pow(10, precision);
  }

  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {
    super('RangeSlider');
  }

  public ngOnInit() {
    this.createWidget(
      connectRange,
      {
        attribute: this.attribute,
        max: parseNumberInput(this.max),
        min: parseNumberInput(this.min),
        precision: parseNumberInput(this.precision),
      },
      {
        $$widgetType: 'ais.rangeSlider',
      }
    );

    super.ngOnInit();
  }

  public updateState = (state: RangeRenderState, isFirstRendering: boolean) => {
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

      // tslint:disable-next-line: no-boolean-literal-compare (pips is @Input, so could be not a boolean)
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

    // TODO: test this as we're nolonger passing disable
    // it seems the API has changed: slider.setAttribute('disabled', true) / slider.removeAttribute('disabled');
    // see: https://refreshless.com/nouislider/more/#section-disable
    this.slider.updateOptions({ range, start });
  };

  public handleChange = (values: RangeBoundaries) => {
    this.state.refine(values);
  };

  public formatTooltip = (value: number) => {
    return value.toFixed(parseNumberInput(this.precision));
  };
}
