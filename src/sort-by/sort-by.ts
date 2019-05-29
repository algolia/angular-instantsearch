import { Component, Input, Inject, forwardRef } from '@angular/core';

import { connectSortBy } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { noop } from '../utils';

export type SortByItem = {
  value: string;
  label: string;
};

export type SortByState = {
  currentRefinement: string | null;
  options: SortByItem[];
  refine: Function;
  // TODO: add hasNoResults: boolean;
};

@Component({
  selector: 'ais-sort-by',
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
  `,
})
export class NgAisSortBy extends BaseWidget {
  @Input() public items: SortByItem[];
  @Input()
  public transformItems?: <U extends SortByItem>(items: SortByItem[]) => U[];

  public state: SortByState = {
    currentRefinement: null,
    options: [],
    refine: noop,
    // TODO: Add hasNoResults: null,
  };

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent: any
  ) {
    super('SortBy');
  }

  public ngOnInit() {
    this.createWidget(connectSortBy, {
      items: this.items,
      transformItems: this.transformItems,
    });
    super.ngOnInit();
  }
}
