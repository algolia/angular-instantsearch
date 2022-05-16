import {
  Component,
  ContentChild,
  TemplateRef,
  Inject,
  forwardRef,
  Optional,
} from '@angular/core';

import { connectStats } from 'instantsearch.js/es/connectors';

import { TypedBaseWidget } from '../typed-base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { NgAisIndex } from '../index-widget/index-widget';
import {
  StatsConnectorParams,
  StatsWidgetDescription,
  StatsRenderState,
} from 'instantsearch.js/es/connectors/stats/connectStats';

@Component({
  selector: 'ais-stats',
  template: `
    <div [class]="cx()">
      <ng-container *ngTemplateOutlet="template; context: templateContext">
      </ng-container>

      <span *ngIf="!template" [class]="cx('text')">
        {{state.nbHits}} results found in {{state.processingTimeMS}}ms.
      </span>
    </div>
  `,
})
export class NgAisStats extends TypedBaseWidget<
  StatsWidgetDescription,
  StatsConnectorParams
> {
  @ContentChild(TemplateRef, { static: false })
  public template: any;

  public state: StatsRenderState = {
    nbHits: 0,
    nbPages: 0,
    page: 0,
    processingTimeMS: 0,
    query: '',
    areHitsSorted: false,
  };

  get templateContext() {
    return { state: this.state };
  }

  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {
    super('Stats');
    this.createWidget(
      connectStats,
      {},
      {
        $$widgetType: 'ais.stats',
      }
    );
  }
}
