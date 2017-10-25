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
    <div class='${cx()}' style="padding: 50px;">
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

  // connector options
  @Input() public attributeName: string;
  @Input() public min?: number | string;
  @Input() public max?: number | string;
  @Input() public precision?: number | string;

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
      // create slider
      const config = {
        connect: true,
        range: { min: 0, max: 1 },
        start: [0, 1],
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
      range: state.range,
      start: state.start
    };

    this.slider.updateOptions(nextConfig);
  };

  public handleChange = (values: string[] | number[]) => {
    this.state.refine(values);
  };
}
