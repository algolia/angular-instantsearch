import { Component, Input, Inject, forwardRef, Optional } from '@angular/core';

import { connectHitsPerPage } from 'instantsearch.js/es/connectors';
import {
  HitsPerPageConnectorParams,
  HitsPerPageWidgetDescription,
  HitsPerPageRenderState,
} from 'instantsearch.js/es/connectors/hits-per-page/connectHitsPerPage';
import { TypedBaseWidget } from '../typed-base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { NgAisIndex } from '../index-widget/index-widget';
import { noop } from '../utils';

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
export class NgAisHitsPerPage extends TypedBaseWidget<
  HitsPerPageWidgetDescription,
  HitsPerPageConnectorParams
> {
  @Input() public items: HitsPerPageConnectorParams['items'];
  @Input() public transformItems?: HitsPerPageConnectorParams['transformItems'];

  public state: HitsPerPageRenderState = {
    items: [],
    refine: noop,
    hasNoResults: true, // TODO: disable <select> when true
  };

  get isHidden(): boolean {
    return this.state.items.length === 0 && this.autoHideContainer;
  }

  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {
    super('HitsPerPage');
  }

  public ngOnInit() {
    this.createWidget(
      connectHitsPerPage,
      {
        items: this.items,
        transformItems: this.transformItems,
      },
      {
        $$widgetType: 'ais.hitsPerPage',
      }
    );
    super.ngOnInit();
  }
}
