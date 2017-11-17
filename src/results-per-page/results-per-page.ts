import { Component, Input } from "@angular/core";
import { connectHitsPerPage } from "instantsearch.js/es/connectors";
import { noop } from "lodash-es";

import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";

export type HitsPerPageSelectorState = {
  items: {}[];
  refine: Function;
};

@Component({
  selector: "ng-ais-results-per-page",
  template: `
    <div [class]="cx()">
      <ng-ais-header [header]="header" [className]="cx('header')"></ng-ais-header>

      <div [class]="cx('body')">
        <select
          [class]="cx('select')"
          (change)="state.refine($event.target.value)"
        >
          <option
            [class]="cx('option')"
            *ngFor="let item of state.items"
            [value]="item.value"
            [selected]="item.isRefined"
          >
            {{item.label}}
          </option>
        </select>
      </div>

      <ng-ais-footer [footer]="footer" [className]="cx('footer')"></ng-ais-footer>
    </div>
  `
})
export class NgAisResultsPerPage extends BaseWidget {
  @Input()
  public items: {
    value: number;
    label: string;
    default?: boolean;
  }[];

  public state: HitsPerPageSelectorState = {
    items: [],
    refine: noop
  };

  constructor(searchInstance: NgAisInstance) {
    super(searchInstance, "HitsPerPageSelector");
  }

  public ngOnInit() {
    this.createWidget(connectHitsPerPage, { items: this.items });
    super.ngOnInit();
  }
}
