import {
  Component,
  ContentChild,
  TemplateRef,
  Inject,
  forwardRef,
  Optional,
} from '@angular/core';

import { connectStats } from 'instantsearch.js/es/connectors';

import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { NgAisIndex } from '../index-widget/index-widget';

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
export class NgAisStats extends BaseWidget {
  @ContentChild(TemplateRef, { static: false })
  public template: any;

  public state = {
    hitPerPage: 0,
    nbHits: 0,
    nbPages: 0,
    page: 0,
    processingTimeMS: 0,
    query: '',
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
    this.createWidget(connectStats);
  }
}
