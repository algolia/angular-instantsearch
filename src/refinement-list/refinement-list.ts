import { Component, Input, Inject, forwardRef } from '@angular/core';
import { connectRefinementList } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { noop } from '../utils';

export type RefinementListItem = {
  value: string;
  label: string;
  count: number;
  isRefined: boolean;
};

export type RefinementListState = {
  canRefine: boolean;
  canToggleShowMore: boolean;
  createURL: Function;
  isShowingMore: boolean;
  items: RefinementListItem[];
  refine: Function;
  toggleShowMore: Function;
  searchForItems: Function;
  isFormSearch: boolean;
};

@Component({
  selector: 'ais-refinement-list',
  template: `
    <div
      [class]="cx()"
      *ngIf="!isHidden"
    >
      <div
        *ngIf="searchable"
        [class]="cx('searchBox')"
      >
        <ais-facets-search
          [search]="state.searchForItems"
          [searchPlaceholder]="searchPlaceholder"
        >
        </ais-facets-search>
      </div>

      <ul [class]="cx('list')">
        <li
          [class]="getItemClass(item)"
          *ngFor="let item of state.items"
          (click)="refine($event, item)"
        >
          <label [class]="cx('label')">
            <input
              [class]="cx('checkbox')"
              type="checkbox"
              value="{{item.value}}"
              [checked]="item.isRefined"
            />
            <span [class]="cx('labelText')">
              <ais-highlight attribute="highlighted" [hit]="item"></ais-highlight>
            </span>
            <span [class]="cx('count')">{{item.count}}</span>
          </label>
        </li>
      </ul>

      <button
        [class]="cx('showMore')"
        *ngIf="showMore"
        (click)="state.toggleShowMore()"
        [disabled]="!state.canToggleShowMore"
      >
        {{state.isShowingMore ? showLessLabel : showMoreLabel}}
      </button>
    </div>
  `,
})
export class NgAisRefinementList extends BaseWidget {
  // render options
  @Input() public showMoreLabel: string = 'Show more';
  @Input() public showLessLabel: string = 'Show less';
  @Input() public searchable?: boolean;
  @Input() public searchPlaceholder: string = 'Search here...';

  // connectors options
  @Input() public attribute: string;
  @Input() public operator: 'or' | 'and' = 'or';
  @Input() public limit: number = 10;
  @Input() public showMore?: boolean;
  @Input() public showMoreLimit: number;
  @Input() public sortBy: string[] | ((item: object) => number);
  @Input()
  public transformItems?: (items: RefinementListItem[]) => RefinementListItem[];

  public state: RefinementListState = {
    canRefine: false,
    canToggleShowMore: false,
    createURL: noop,
    isShowingMore: false,
    items: [],
    refine: noop,
    toggleShowMore: noop,
    searchForItems: noop,
    isFormSearch: false,
  };

  get isHidden() {
    return this.state.items.length === 0 && this.autoHideContainer;
  }

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent: any
  ) {
    super('RefinementList');
  }

  public ngOnInit() {
    this.createWidget(connectRefinementList, {
      showMore: this.showMore,
      limit: this.limit,
      showMoreLimit: this.showMoreLimit,
      attribute: this.attribute,
      operator: this.operator,
      sortBy: this.sortBy,
      escapeFacetValues: true,
      transformItems: this.transformItems,
    });

    super.ngOnInit();
  }

  public refine(
    event: MouseEvent,
    item: { isRefined: boolean; value: string }
  ) {
    event.preventDefault();
    event.stopPropagation();

    if (this.state.canRefine) {
      // update UI directly, it will update the checkbox state
      item.isRefined = !item.isRefined;

      // refine through Algolia API
      this.state.refine(item.value);
    }
  }
}
