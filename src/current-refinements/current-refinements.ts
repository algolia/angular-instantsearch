import { Component, Input, Inject, forwardRef, Optional } from '@angular/core';

import { connectCurrentRefinements } from 'instantsearch.js/es/connectors';
import {
  CurrentRefinementsConnectorParams,
  CurrentRefinementsConnectorParamsRefinement,
  CurrentRefinementsWidgetDescription,
  CurrentRefinementsRenderState,
} from 'instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements';
import { TypedBaseWidget } from '../typed-base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { NgAisIndex } from '../index-widget/index-widget';
import { noop } from '../utils';

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
export class NgAisCurrentRefinements extends TypedBaseWidget<
  CurrentRefinementsWidgetDescription,
  CurrentRefinementsConnectorParams
> {
  // instance options
  @Input()
  public includedAttributes?: CurrentRefinementsConnectorParams['includedAttributes'];
  @Input()
  public excludedAttributes?: CurrentRefinementsConnectorParams['excludedAttributes'];
  @Input()
  public transformItems?: CurrentRefinementsConnectorParams['transformItems'];

  public state: CurrentRefinementsRenderState = {
    createURL: () => '#',
    refine: noop,
    items: [],
    canRefine: false,
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
    super('CurrentRefinements');
  }

  public ngOnInit() {
    this.createWidget(
      connectCurrentRefinements,
      {
        includedAttributes: this.includedAttributes,
        excludedAttributes: this.excludedAttributes,
        transformItems: this.transformItems,
      },
      {
        $$widgetType: 'ais.currentRefinements',
      }
    );
    super.ngOnInit();
  }

  public handleClick(
    event: MouseEvent,
    refinement: CurrentRefinementsConnectorParamsRefinement
  ) {
    event.preventDefault();
    this.state.refine(refinement);
  }
}
