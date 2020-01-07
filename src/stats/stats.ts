import {
  Component,
  ContentChild,
  TemplateRef,
  Inject,
  forwardRef,
} from '@angular/core';

import { connectStats } from 'instantsearch.js/es/connectors';

import { BaseWidget, Connector } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';

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
  @ContentChild(TemplateRef) public template: any;

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
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent: NgAisInstantSearch
  ) {
    super('Stats');
    this.createWidget(connectStats as Connector);
  }
}
