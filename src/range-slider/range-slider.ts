import { Component, Input, ViewChild } from "@angular/core";
import { connectRangeSlider } from "instantsearch.js/es/connectors";
import { noop, omit } from "lodash";
import * as noUiSlider from "nouislider";

import BaseWidget from "../base-widget";
import { NgISInstance } from "../instantsearch/instantsearch-instance";
import { bem, parseNumberInput } from "../utils";

const cx = bem("RangeSlider");

@Component({
  selector: "ngis-range-slider",
  template: `
    <div class='${cx()}'>
      <ngis-header [header]="header" className="${cx("header")}"></ngis-header>

      <div class="${cx("body")}">
        <div #sliderContainer></div>
      </div>

      <ngis-footer [footer]="footer" className="${cx("footer")}"></ngis-footer>
    </div>
  `
})
export class NgISRangeSlider extends BaseWidget {
  @ViewChild("sliderContainer") public sliderContainer;

  // render options
  @Input() public step: number | string = 1;
  @Input() public pips: boolean = true;

  // connector options
  @Input() public attributeName: string;
  @Input() public min?: number | string;
  @Input() public max?: number | string;
  @Input() public precision?: number | string = 2;

  public state = {
    range: { min: 0, max: 1 },
    refine: noop,
    start: [0, 1]
  };

  private slider;

  constructor(searchInstance: NgISInstance) {
    super(searchInstance);
  }

  public ngOnInit() {
    this.createWidget(connectRangeSlider, {
      attributeName: this.attributeName,
      max: parseNumberInput(this.max),
      min: parseNumberInput(this.min),
      precision: parseNumberInput(this.precision)
    });

    super.ngOnInit();
  }

  public updateState = (state, isFirstRendering) => {
    if (isFirstRendering) {
      const pips =
        this.pips === true || typeof this.pips === "undefined"
          ? {
              density: 3,
              mode: "positions",
              stepped: true,
              values: [0, 50, 100]
            }
          : this.pips;

      // create slider
      const config = {
        animate: false,
        behaviour: "snap",
        connect: true,
        pips,
        range: { min: 0, max: 1 },
        start: [0, 1],
        step: this.step,
        tooltips: true
      };

      this.slider = noUiSlider.create(
        this.sliderContainer.nativeElement,
        config
      );

      // register listen events
      this.sliderContainer.nativeElement.noUiSlider.on(
        "change",
        this.handleChange
      );

      return;
    }

    // update state
    this.state = state;

    // update the slider state
    const nextConfig = {
      range: {
        max: Math.ceil(state.range.max),
        min: Math.floor(state.range.min)
      },
      start: [
        isFinite(state.start[0]) ? state.start[0] : Math.floor(state.range.min),
        isFinite(state.start[1]) ? state.start[1] : Math.floor(state.range.max)
      ]
    };

    this.slider.updateOptions(nextConfig);
  };

  public handleChange = ([start, end]: string[] | number[]) => {
    const { range: { min, max } } = this.state;
    const values = [start < min ? min : start, end > max ? max : end];

    this.state.refine(values);
  };
}
