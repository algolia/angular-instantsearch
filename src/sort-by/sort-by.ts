import { Component, Input, Inject, forwardRef } from "@angular/core";

import { connectSortBySelector } from "instantsearch.js/es/connectors";
import { noop } from "lodash-es";

import { BaseWidget } from "../base-widget";
import { NgAisInstantSearch } from "../instantsearch/instantsearch";

@Component({
  selector: "ng-ais-sort-by",
  template: `
    <div [class]="cx()">
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
  `
})
export class NgAisSortBy extends BaseWidget {
  @Input()
  public items: {
    name: string;
    label: string;
  }[];

  public state: {
    currentRefinement: string | null;
    options: {}[];
    refine: Function;
  } = {
    currentRefinement: null,
    options: [],
    refine: noop
  };

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent: any
  ) {
    super("SortBy");
  }

  public ngOnInit() {
    this.createWidget(connectSortBySelector, { indices: this.items });
    super.ngOnInit();
  }
}
