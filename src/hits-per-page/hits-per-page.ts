import { Component, Input, Inject, forwardRef } from '@angular/core';

import { connectHitsPerPage } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { noop } from '../utils';

export type HitsPerPageState = {
  items: HitsPerPageRenderingItem[];
  refine: (value: number) => void;
};

export type HitsPerPageInstanceItem = {
  value: number;
  label: string;
  default?: boolean;
};

export type HitsPerPageRenderingItem = {
  value: number;
  label: string;
  isRefined: boolean;
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
  @Input() public items: HitsPerPageInstanceItem[];
  @Input()
  public transformItems?: <U extends HitsPerPageRenderingItem>(
    items: HitsPerPageRenderingItem[]
  ) => U[];

  public state: HitsPerPageState = {
    items: [],
    refine: noop,
    // TODO: add hasNoResults and disable <select> when true
  };

  get isHidden(): boolean {
    return this.state.items.length === 0 && this.autoHideContainer;
  }

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent: any
  ) {
    super('HitsPerPage');
  }

  public ngOnInit() {
    this.createWidget(connectHitsPerPage, {
      items: this.items,
      transformItems: this.transformItems,
    });
    super.ngOnInit();
  }
}
