import { Component, Input, Inject, forwardRef, Optional } from '@angular/core';

import { connectNumericMenu } from 'instantsearch.js/es/connectors';
import { TypedBaseWidget } from '../typed-base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { NgAisIndex } from '../index-widget/index-widget';
import { noop } from '../utils';
import {
  NumericMenuConnectorParams,
  NumericMenuWidgetDescription,
  NumericMenuRenderState,
} from 'instantsearch.js/es/connectors/numeric-menu/connectNumericMenu';

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
export class NgAisNumericMenu extends TypedBaseWidget<
  NumericMenuWidgetDescription,
  NumericMenuConnectorParams
> {
  @Input() public attribute: NumericMenuConnectorParams['attribute'];
  @Input() public items: NumericMenuConnectorParams['items'];
  @Input() public transformItems?: NumericMenuConnectorParams['transformItems'];

  public state: NumericMenuRenderState = {
    items: [],
    refine: noop,
    createURL: () => '#',
    hasNoResults: true,
    sendEvent: noop,
  };

  get isHidden() {
    return this.state.items.length === 0 && this.autoHideContainer;
  }

  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {
    super('NumericMenu');
  }

  public ngOnInit() {
    this.createWidget(
      connectNumericMenu,
      {
        attribute: this.attribute,
        items: this.items,
        transformItems: this.transformItems,
      },
      {
        $$widgetType: 'ais.numericMenu',
      }
    );
    super.ngOnInit();
  }

  public refine(event: Event, item: { value: string }) {
    event.preventDefault();
    event.stopPropagation();
    this.state.refine(item.value);
  }
}
