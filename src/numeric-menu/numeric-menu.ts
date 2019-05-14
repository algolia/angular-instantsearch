import { Component, Input, Inject, forwardRef } from '@angular/core';

import { connectNumericMenu } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { noop } from '../utils';

export type NumericMenuItem = {
  label: string;
  value: string;
  isRefined: boolean;
};

export type NumericMenuState = {
  createURL: Function;
  items: NumericMenuItem[];
  refine: Function;
  hasNoResults?: boolean;
};

@Component({
  selector: 'ais-numeric-menu',
  template: `
    <div
      [class]="cx()"
      *ngIf="!isHidden"
    >
      <ul [class]="cx('list')">
        <li
          [class]="getItemClass(item)"
          *ngFor="let item of state.items"
        >
          <label [class]="cx('label')">
            <input
              [class]="cx('radio')"
              type="radio"
              name="NumericMenu"
              [checked]="item.isRefined"
              (change)="refine($event, item)"
            />
            <span [class]="cx('labelText')">{{item.label}}</span>
          </label>
        </li>
      </ul>
    </div>
  `,
})
export class NgAisNumericMenu extends BaseWidget {
  @Input() public attribute: string;
  @Input() public items: { label: string; start?: number; end?: number }[];
  @Input()
  public transformItems?: <U extends NumericMenuItem>(
    items: NumericMenuItem[]
  ) => U[];

  public state: NumericMenuState = {
    items: [],
    refine: noop,
    createURL: noop,
  };

  get isHidden() {
    return this.state.items.length === 0 && this.autoHideContainer;
  }

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent: any
  ) {
    super('NumericMenu');
  }

  public ngOnInit() {
    this.createWidget(connectNumericMenu, {
      attribute: this.attribute,
      items: this.items,
      transformItems: this.transformItems,
    });
    super.ngOnInit();
  }

  public refine(event: MouseEvent, item: { value: string }) {
    event.preventDefault();
    event.stopPropagation();
    this.state.refine(item.value);
  }
}
