import { Component, Input, Inject, PLATFORM_ID } from "@angular/core";
import { connectRefinementList } from "instantsearch.js/es/connectors";
import { noop, isFunction } from "lodash-es";

import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
import { parseNumberInput } from "../utils";

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
    <div [class]="cx()">
      <ng-ais-header [header]="header" [className]="cx('header')"></ng-ais-header>

      <div [class]="cx('body')">
        <form
          [class]="cx('form')"
          *ngIf="withSearchBox"
          (submit)="handleSubmit($event)"
          novalidate
        >
          <input
            [class]="cx('input')"
            autocapitalize="off"
            autocorrect="off"
            placeholder="{{searchPlaceholder}}"
            role="textbox"
            spellcheck="false"
            type="text"
            [value]="searchQuery"
            (input)="handleChange($event.target.value)"
          />
        </form>

        <ul [class]="cx('list')">
          <li
            [class]="cx('item') + (item.isRefined ? cx('item', 'selected') : '')"
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
              <ng-ais-highlight
                attributeName="highlighted"
                [hit]="item"
              >
              </ng-ais-highlight>
              <span [class]="cx('count')">
                {{item.count}}
              </span>
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

      <ng-ais-footer [footer]="footer" [className]="cx('footer')"></ng-ais-footer>
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

  // inner state
  searchQuery = "";

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

  handleSubmit(event: MouseEvent) {
    event.preventDefault();
    this.state.searchForItems(this.searchQuery);
  }

  handleChange(value: string) {
    this.searchQuery = value;
    this.state.searchForItems(value);
  }
}
