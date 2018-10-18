import { Component, Input, Inject, forwardRef } from '@angular/core';

import { connectHitsPerPage } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { noop } from '../utils';

export type ResultsPerPageState = {
  items: {}[];
  refine: Function;
};

@Component({
  selector: 'ais-hits-per-page',
  template: `
    <div
      [class]="cx()"
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
  `,
})
export class NgAisHitsPerPage extends BaseWidget {
  @Input()
  public items: {
    value: number;
    label: string;
    default?: boolean;
  }[];

  public state: ResultsPerPageState = {
    items: [],
    refine: noop,
  };

  get isHidden() {
    return this.state.items.length === 0 && this.autoHideContainer;
  }

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent: any
  ) {
    super('HitsPerPage');
  }

  public ngOnInit() {
    this.createWidget(connectHitsPerPage, { items: this.items });
    super.ngOnInit();
  }
}
