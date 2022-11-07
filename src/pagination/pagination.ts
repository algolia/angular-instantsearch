import { Component, Input, Inject, forwardRef, Optional } from '@angular/core';
import { connectPagination } from 'instantsearch.js/es/connectors';
import { TypedBaseWidget } from '../typed-base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { NgAisIndex } from '../index-widget/index-widget';
import { parseNumberInput, noop, range } from '../utils';
import {
  PaginationConnectorParams,
  PaginationWidgetDescription,
  PaginationRenderState,
} from 'instantsearch.js/es/connectors/pagination/connectPagination';

export { PaginationConnectorParams, PaginationRenderState };

@Component({
  selector: 'ais-pagination',
  template: `
    <div [ngClass]="[cx(), state.nbPages <= 1 ? cx('', 'noRefinement') : '']">
      <ul [class]="cx('list')">
        <li
          *ngIf="showFirst"
          (click)="refine($event, 0)"
          [class]="
            cx('item') +
            ' ' +
            cx('item', 'firstPage') +
            (state.currentRefinement === 0 ? ' ' + cx('item', 'disabled') : '')
          "
        >
          <a
            [href]="state.createURL(0)"
            [class]="cx('link')"
          >
            ‹‹
          </a>
        </li>

        <li
          *ngIf="showPrevious"
          (click)="refine($event, state.currentRefinement - 1)"
          [class]="
            cx('item') +
            ' ' +
            cx('item', 'previousPage') +
            (state.currentRefinement === 0 ? ' ' + cx('item', 'disabled') : '')
          "
        >
          <a
            [href]="state.createURL(state.currentRefinement - 1)"
            [class]="cx('link')"
          >
            ‹
          </a>
        </li>

        <li
          [class]="
            cx('item') +
            ' ' +
            cx('item', 'page') +
            (state.currentRefinement === page ? ' ' + cx('item', 'selected') : '')
          "
          *ngFor="let page of state.pages"
          (click)="refine($event, page)"
        >
          <a
            [class]="cx('link')"
            [href]="state.createURL(page)"
          >
            {{page + 1}}
          </a>
        </li>

        <li
          *ngIf="showNext"
          (click)="refine($event, state.currentRefinement + 1)"
          [class]="
            cx('item') +
            ' ' +
            cx('item', 'nextPage') +
            (state.currentRefinement + 1 === state.nbPages ? ' ' + cx('item', 'disabled') : '')
          "
        >
          <a
            [href]="state.createURL(state.currentRefinement + 1)"
            [class]="cx('link')"
          >
            ›
          </a>
        </li>

        <li
          *ngIf="showLast"
          (click)="refine($event, state.nbPages - 1)"
          [class]="
            cx('item') +
            ' ' +
            cx('item', 'lastPage') +
            (state.currentRefinement + 1 === state.nbPages ? ' ' + cx('item', 'disabled') : '')
          "
        >
          <a
            [href]="state.createURL(state.nbPages - 1)"
            [class]="cx('link')"
          >
            ››
          </a>
        </li>
      </ul>
    </div>
  `,
})
export class NgAisPagination extends TypedBaseWidget<
  PaginationWidgetDescription,
  PaginationConnectorParams
> {
  // rendering options
  @Input() public showFirst: boolean = true;
  @Input() public showLast: boolean = true;
  @Input() public showPrevious: boolean = true;
  @Input() public showNext: boolean = true;

  // instance options
  @Input() public padding: PaginationConnectorParams['padding'] = 3;
  @Input() public totalPages?: PaginationConnectorParams['totalPages'];
  // TODO: check if this works, padding and totalPages are most likely strings when passed to the template

  public state: PaginationRenderState = {
    createURL: () => '#',
    currentRefinement: 0,
    nbHits: 0,
    nbPages: 0,
    refine: noop,
    pages: [],
    canRefine: false,
    isFirstPage: false,
    isLastPage: false,
  };

  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {
    super('Pagination');
  }

  public ngOnInit() {
    this.createWidget(
      connectPagination,
      {
        totalPages: parseNumberInput(this.totalPages),
      },
      {
        $$widgetType: 'ais.pagination',
      }
    );
    super.ngOnInit();
  }

  public refine(event: MouseEvent, page: number) {
    event.stopPropagation();
    event.preventDefault();

    if (
      page < 0 ||
      page === this.state.currentRefinement ||
      page >= this.state.nbPages
    ) {
      return;
    }

    this.state.refine(page);
  }
}
