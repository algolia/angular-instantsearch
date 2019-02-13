import { Component, Input, Inject, forwardRef } from '@angular/core';

import { connectCurrentRefinements } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { noop } from '../utils';

export type CurrentRefinementsItem = {
  attribute: string;
  label: string;
  refine: Function;
  refinements: {
    type: string;
    // TODO: create multiple types for each of the available refinement
    // https://github.com/algolia/angular-instantsearch/pull/463#discussion_r255911232
    attribute: string;
    label: string;
    value: string;
    operator?: string;
    exhaustive?: boolean;
    count?: number;
  }[];
};

export type CurrentRefinementsState = {
  createURL: Function;
  refine: Function;
  items: CurrentRefinementsItem[];
};

@Component({
  selector: 'ais-current-refinements',
  template: `
    <div
      [class]="cx()"
      *ngIf="!isHidden"
    >
      <ul
        [class]="cx('list')"
        *ngFor="let item of state.items"
      >
        <li [class]="cx('item')">
          <span [class]="cx('label')">{{item.label | titlecase}}:</span>

          <span
            [class]="cx('category')"
            *ngFor="let refinement of item.refinements"
          >
            <span [class]="cx('categoryLabel')">{{refinement.label}}</span>
            <button [class]="cx('delete')" (click)="handleClick($event, refinement)">✕</button>
          </span>
        </li>
      </ul>
    </div>
  `,
})
export class NgAisCurrentRefinements extends BaseWidget {
  // instance options
  @Input() public includedAttributes?: string[];
  @Input() public excludedAttributes?: string[];
  @Input()
  public transformItems?: <U extends CurrentRefinementsItem>(
    items: CurrentRefinementsItem[]
  ) => U[];

  public state: CurrentRefinementsState = {
    createURL: noop,
    refine: noop,
    items: [],
  };

  get isHidden() {
    return this.state.items.length === 0 && this.autoHideContainer;
  }

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent: any
  ) {
    super('CurrentRefinements');
  }

  public ngOnInit() {
    this.createWidget(connectCurrentRefinements, {
      includedAttributes: this.includedAttributes,
      excludedAttributes: this.excludedAttributes,
      transformItems: this.transformItems,
    });
    super.ngOnInit();
  }

  public handleClick(event: MouseEvent, refinement: {}) {
    event.preventDefault();
    this.state.refine(refinement);
  }
}
