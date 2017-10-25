import { Component, Input } from "@angular/core";
import { connectRangeSlider } from "instantsearch.js/es/connectors";
import { noop } from "lodash";

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
        <nouislider
          [connect]="true"
          [step]="step"
          [min]="state.range.min"
          [max]="state.range.max"
          [(ngModel)]="currentValue"
        >
        </nouislider>
      </div>

      <ngis-footer [footer]="footer" className="${cx("footer")}"></ngis-footer>
    </div>
  `
})
export class NgISRangeSlider extends BaseWidget {
  // render options
  @Input() public step: number | string = 1;

  // connector options
  @Input() public attributeName: string;
  @Input() public min?: number | string;
  @Input() public max?: number | string;
  @Input() public precision?: number | string;

  public state = {
    range: { min: 0, max: 100 },
    refine: noop,
    start: [0, 100]
  };

  public currentValue = [0, 1];

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
    if (!isFirstRendering) {
      this.state = state;

      const [start, end] = this.state.start;
      const { min, max } = this.state.range;

      if (isFinite(start) && isFinite(end)) {
        this.currentValue = [start, end];
      }

      if (!isFinite(start) || !isFinite(end)) {
        this.currentValue = [min, max];
      }
    }
  };
}
