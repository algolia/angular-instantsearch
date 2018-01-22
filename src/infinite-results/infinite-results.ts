import {
  Component,
  ContentChild,
  Input,
  TemplateRef,
  Inject,
  PLATFORM_ID
} from "@angular/core";
import { connectInfiniteHits } from "instantsearch.js/es/connectors";
import { noop, isFunction } from "lodash-es";

import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";

@Component({
  selector: "ng-ais-infinite-results",
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
            <ng-ais-highlight attributeName="name" [hit]="hit">
            </ng-ais-highlight>
          </li>
        </ul>
      </div>

      <button
        [class]="cx('showMore')"
        (click)="showMore($event)"
        [disabled]="state.isLastPage"
      >
        {{showMoreLabel}}
      </button>
    </div>
  `
})
export class NgAisInfiniteResults extends BaseWidget {
  @ContentChild(TemplateRef) public template?: any;

  // render options
  @Input() public showMoreLabel: string = "Show more results";
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
    results: {}
  };

  constructor(
    @Inject(PLATFORM_ID) public platformId: Object,
    searchInstance: NgAisInstance
  ) {
    super(searchInstance, "InfiniteResults");
    this.createWidget(connectInfiniteHits, { escapeHits: true });
  }

  public showMore(event: MouseEvent) {
    event.preventDefault();
    this.state.showMore();
  }

  updateState = (
    state: { hits: {}[]; results: {}; isLastPage: boolean; showMore: Function },
    isFirstRendering: boolean
  ) => {
    if (isFirstRendering) return;

    this.state = {
      ...state,
      results: state.results,
      hits: isFunction(this.transformItems)
        ? this.transformItems(state.hits)
        : state.hits
    };
  };
}
