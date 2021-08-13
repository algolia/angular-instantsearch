import {
  Component,
  ContentChild,
  Input,
  TemplateRef,
  Inject,
  forwardRef,
  Optional,
} from '@angular/core';
import { connectInfiniteHitsWithInsights } from 'instantsearch.js/es/connectors';
import {
  InfiniteHitsConnectorParams,
  InfiniteHitsWidgetDescription,
  InfiniteHitsRenderState,
} from 'instantsearch.js/es/connectors/infinite-hits/connectInfiniteHits';
import { TypedBaseWidget } from '../typed-base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { NgAisIndex } from '../index-widget/index-widget';
import { noop } from '../utils';

@Component({
  selector: 'ais-infinite-hits',
  template: `
    <div [class]="cx()">
      <ng-container *ngTemplateOutlet="template; context: state"></ng-container>

      <!-- default rendering if no template specified -->
      <button
        [ngClass]="[cx('loadPrevious'), this.state.isFirstPage ? cx('loadPrevious', 'disabled') : '']"
        (click)="showPreviousHandler($event)"
        [disabled]="state.isFirstPage"
        *ngIf="showPrevious && !template"
      >
        {{showPreviousLabel}}
      </button>

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
        (click)="showMoreHandler($event)"
        [disabled]="state.isLastPage"
        *ngIf="!template"
      >
        {{showMoreLabel}}
      </button>
    </div>
  `,
})
export class NgAisInfiniteHits extends TypedBaseWidget<
  InfiniteHitsWidgetDescription,
  InfiniteHitsConnectorParams
> {
  @ContentChild(TemplateRef, { static: false })
  public template?: any;

  // rendering options
  @Input() public escapeHTML: InfiniteHitsConnectorParams['escapeHTML'];
  @Input()
  public showPrevious: InfiniteHitsConnectorParams['showPrevious'] = false;
  @Input() public showPreviousLabel: string = 'Show previous results';
  @Input() public showMoreLabel: string = 'Show more results';
  @Input()
  public transformItems?: InfiniteHitsConnectorParams['transformItems'];

  public state: InfiniteHitsRenderState = {
    hits: [],
    results: undefined,
    currentPageHits: [],
    isFirstPage: false,
    isLastPage: false,
    showMore: noop,
    showPrevious: noop,
    sendEvent: noop,
    bindEvent: () => '',
  };

  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {
    super('InfiniteHits');
  }

  ngOnInit() {
    this.createWidget(connectInfiniteHitsWithInsights, {
      escapeHTML: this.escapeHTML,
      transformItems: this.transformItems,
    });
    super.ngOnInit();
  }

  public showMoreHandler(event: MouseEvent) {
    event.preventDefault();
    this.state.showMore();
  }

  public showPreviousHandler(event: MouseEvent) {
    event.preventDefault();
    this.state.showPrevious();
  }

  updateState = (state, isFirstRendering: boolean) => {
    if (isFirstRendering) return;
    this.state = state;
  };
}
