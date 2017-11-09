import { Component, Input } from "@angular/core";
import { connectSortBySelector } from "instantsearch.js/es/connectors";
import { noop } from "lodash-es";

import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";

interface State {
  currentRefinement?: string;
  options: {}[];
  refine: Function;
}

@Component({
  selector: "ng-ais-sort-by-selector",
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
            *ngFor="let item of state.options"
            [value]="item.value"
            [selected]="item.value === state.currentRefinement"
          >
            {{item.label}}
          </option>
        </select>
      </div>

      <ng-ais-footer [footer]="footer" [className]="cx('footer')"></ng-ais-footer>
    </div>
  `
})
export class NgAisSortBySelector extends BaseWidget {
  @Input()
  public indices: {
    name: string;
    label: string;
  }[];

  public state: State = {
    currentRefinement: null,
    options: [],
    refine: noop
  };

  constructor(searchInstance: NgAisInstance) {
    super(searchInstance, "SortBySelector");
  }

  public ngOnInit() {
    this.createWidget(connectSortBySelector, { indices: this.indices });
    super.ngOnInit();
  }
}
