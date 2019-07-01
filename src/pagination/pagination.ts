const range = require('lodash/range');
import { Component, Input, Inject, forwardRef } from '@angular/core';
import { connectPagination } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { parseNumberInput, noop } from '../utils';

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
          *ngFor="let page of pages"
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
export class NgAisPagination extends BaseWidget {
  // rendering options
  @Input() public showFirst: boolean = true;
  @Input() public showLast: boolean = true;
  @Input() public showPrevious: boolean = true;
  @Input() public showNext: boolean = true;
  @Input() public padding: number | string = 3;

  // instance options
  @Input() public totalPages?: number | string;

  public state = {
    createURL: noop,
    currentRefinement: 0,
    nbHits: 0,
    nbPages: 0,
    refine: noop,
  };

  get pages() {
    const { nbPages, currentRefinement } = this.state;

    const pagesArray = Array.apply(null, { length: nbPages }).map(
      Number.call,
      Number
    );

    const pagesPadding =
      typeof this.padding === 'string'
        ? parseInt(this.padding, 10)
        : this.padding;

    if (pagesPadding && pagesPadding > 0) {
      // should not display pages that does not exists
      if (nbPages < pagesPadding * 2 + 1) {
        return pagesArray;
      }

      const minDelta = currentRefinement - pagesPadding - 1;
      const maxDelta = currentRefinement + pagesPadding + 1;

      if (minDelta < 0) {
        return range(0, currentRefinement + pagesPadding + Math.abs(minDelta));
      }

      if (maxDelta > nbPages) {
        return range(
          currentRefinement - pagesPadding - (maxDelta - nbPages),
          nbPages
        );
      }

      return range(
        currentRefinement - pagesPadding,
        currentRefinement + pagesPadding + 1
      );
    }

    return pagesArray;
  }

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent: any
  ) {
    super('Pagination');
  }

  public ngOnInit() {
    this.createWidget(connectPagination, {
      maxPages: parseNumberInput(this.totalPages),
    });
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
