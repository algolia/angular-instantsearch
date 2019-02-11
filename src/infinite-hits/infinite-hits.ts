import {
  Component,
  ContentChild,
  Input,
  TemplateRef,
  Inject,
  forwardRef,
} from '@angular/core';

import { connectInfiniteHits } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { noop } from '../utils';

@Component({
  selector: 'ais-infinite-hits',
  template: `
    <div [class]="cx()">
      <ng-container *ngTemplateOutlet="template; context: state"></ng-container>

      <!-- default rendering if no template specified -->
      <div *ngIf="!template">
        <ul [class]="cx('list')">
          <li
            [class]="cx('item')"
            *ngFor="let hit of state.hits"
          >
            <ais-highlight attribute="name" [hit]="hit">
            </ais-highlight>
          </li>
        </ul>
      </div>

      <button
        [ngClass]="[cx('loadMore'), this.state.isLastPage ? cx('loadMore', 'disabled') : '']"
        (click)="showMore($event)"
        [disabled]="state.isLastPage"
        *ngIf="!template"
      >
        {{showMoreLabel}}
      </button>
    </div>
  `,
})
export class NgAisInfiniteHits extends BaseWidget {
  @ContentChild(TemplateRef) public template?: any;

  // render options
  @Input() public showMoreLabel: string = 'Show more results';
  @Input() public transformItems?: Function;

  // inner widget state returned from connector
  public state: {
    hits: {}[];
    isLastPage: boolean;
    showMore: Function;
    results: {};
  } = {
    hits: [],
    isLastPage: false,
    showMore: noop,
    results: {},
  };

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent: any
  ) {
    super('InfiniteHits');
    this.createWidget(connectInfiniteHits, { escapeHits: true });
  }

  public showMore(event: MouseEvent) {
    event.preventDefault();
    this.state.showMore();
  }

  updateState = (state, isFirstRendering: boolean) => {
    if (isFirstRendering) return;

    this.state = {
      ...state,
      results: state.results,
      hits:
        typeof this.transformItems === 'function'
          ? this.transformItems(state.hits)
          : state.hits,
    };
  };
}
