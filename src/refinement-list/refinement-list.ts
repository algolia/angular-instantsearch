import { Component, Input, Inject, PLATFORM_ID } from "@angular/core";
import { connectRefinementList } from "instantsearch.js/es/connectors";
import { noop, isFunction } from "lodash-es";

import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
import { bem, parseNumberInput } from "../utils";

export type RefinementListState = {
  canRefine: boolean;
  canToggleShowMore: boolean;
  createURL: Function;
  isShowingMore: boolean;
  items: {}[];
  refine: Function;
  toggleShowMore: Function;
  searchForItems: Function;
  isFormSearch: boolean;
};

@Component({
  selector: "ng-ais-refinement-list",
  template: `
    <div
      [class]="cx()"
      *ngIf="!isHidden"
    >
      <div
        *ngIf="withSearchBox"
        [class]="cx('searchBox')"
      >
        <ng-ais-facets-search
          [search]="state.searchForItems"
          [searchPlaceholder]="searchPlaceholder"
        >
        </ng-ais-facets-search>
      </div>

      <ul [class]="cx('list')">
        <li
          [class]="cx('item') + (item.isRefined ? (' ' + cx('item', 'selected')) : '')"
          *ngFor="let item of items"
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
              <ng-ais-highlight attributeName="highlighted" [hit]="item"></ng-ais-highlight>
            </span>
            <span [class]="cx('count')">{{item.count}}</span>
          </label>
        </li>
      </ul>

      <button
        *ngIf="state.canToggleShowMore"
        (click)="state.toggleShowMore()"
      >
        {{state.isShowingMore ? showLessLabel : showMoreLabel}}
      </button>
    </div>
  `
})
export class NgAisRefinementList extends BaseWidget {
  // render options
  @Input() public showMoreLabel: string = "Show more";
  @Input() public showLessLabel: string = "Show less";
  @Input() public transformItems?: Function;
  @Input() public withSearchBox?: boolean;
  @Input() public searchPlaceholder: string = "Search here...";

  // connectors options
  @Input() public attributeName: string;
  @Input() public operator: "or" | "and" = "or";
  @Input() public limitMin: number | string = 10;
  @Input() public limitMax: number | string;
  @Input() public sortBy: string[] | ((item: object) => number);

  public state: RefinementListState = {
    canRefine: false,
    canToggleShowMore: false,
    createURL: noop,
    isShowingMore: false,
    items: [],
    refine: noop,
    toggleShowMore: noop,
    searchForItems: noop,
    isFormSearch: false
  };

  get isHidden() {
    return this.state.items.length === 0 && this.autoHideContainer;
  }

  constructor(
    @Inject(PLATFORM_ID) public platformId: Object,
    searchInstance: NgAisInstance
  ) {
    super(searchInstance, "RefinementList");
  }

  get items() {
    return isFunction(this.transformItems)
      ? this.transformItems(this.state.items)
      : this.state.items;
  }

  public ngOnInit() {
    this.createWidget(connectRefinementList, {
      limit: parseNumberInput(this.limitMin),
      showMoreLimit: parseNumberInput(this.limitMax),
      attributeName: this.attributeName,
      sortBy: this.sortBy,
      escapeFacetValues: true
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
