import { Component, Input, Inject, forwardRef } from "@angular/core";

import { connectRefinementList } from "instantsearch.js/es/connectors";
import { BaseWidget } from "../base-widget";
import { NgAisInstantSearch } from "../instantsearch/instantsearch";
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
  selector: "ais-refinement-list",
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
              <ais-highlight attribute="highlighted" [hit]="item"></ais-highlight>
            </span>
            <span [class]="cx('count')">{{item.count}}</span>
          </label>
        </li>
      </ul>

      <button
        *ngIf="showMoreLimit && state.canToggleShowMore"
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
  @Input() public searchable?: boolean;
  @Input() public searchPlaceholder: string = "Search here...";

  // connectors options
  @Input() public attribute: string;
  @Input() public operator: "or" | "and" = "or";
  @Input() public limit: number | string = 10;
  @Input() public showMoreLimit: number | string;
  @Input() public sortBy: string[] | ((item: object) => number);

  public state: RefinementListState = {
    canRefine: false,
    canToggleShowMore: false,
    createURL: () => {},
    isShowingMore: false,
    items: [],
    refine: () => {},
    toggleShowMore: () => {},
    searchForItems: () => {},
    isFormSearch: false
  };

  get isHidden() {
    return this.state.items.length === 0 && this.autoHideContainer;
  }

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent: any
  ) {
    super("RefinementList");
  }

  get items() {
    return typeof this.transformItems === "function"
      ? this.transformItems(this.state.items)
      : this.state.items;
  }

  public ngOnInit() {
    this.createWidget(connectRefinementList, {
      limit: parseNumberInput(this.limit),
      showMoreLimit: parseNumberInput(this.showMoreLimit),
      attributeName: this.attribute,
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
