import { Component, Input, Inject, PLATFORM_ID } from "@angular/core";
import { connectHitsPerPage } from "instantsearch.js/es/connectors";
import { noop } from "lodash-es";

import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";

export type ResultsPerPageState = {
  items: {}[];
  refine: Function;
};

@Component({
  selector: "ng-ais-results-per-page",
  template: `
    <div [class]="cx()">
      <div
        [class]="cx('body')"
        *ngIf="!isHidden"
      >
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

  public state: ResultsPerPageState = {
    items: [],
    refine: noop
  };

  get isHidden() {
    return this.state.items.length === 0 && this.autoHideContainer;
  }

  constructor(
    @Inject(PLATFORM_ID) public platformId: Object,
    searchInstance: NgAisInstance
  ) {
    super(searchInstance, "ResultsPerPage");
  }

  public ngOnInit() {
    this.createWidget(connectHitsPerPage, { items: this.items });
    super.ngOnInit();
  }
}
