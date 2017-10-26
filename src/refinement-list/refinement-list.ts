import { Component, Input } from "@angular/core";
import { connectRefinementList } from "instantsearch.js/es/connectors";
import { noop } from "lodash";

import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
import { bem } from "../utils";

const cx = bem("RefinementList");

@Component({
  selector: "ng-ais-refinement-list",
  template: `
    <div class="${cx()}">
      <ng-ais-header [header]="header" className="${cx(
        "header"
      )}"></ng-ais-header>

      <div class="${cx("body")}">
        <ul class="${cx("list")}">
          <li
            [ngClass]="{
              '${cx("item")}': true,
              '${cx("item", "selected")}': item.isRefined
            }"
            *ngFor="let item of state.items"
            (click)="refine($event, item)"
          >
            <label class="${cx("label")}">
              <input
                class="${cx("checkbox")}"
                type="checkbox"
                value="{{item.value}}"
                [checked]="item.isRefined"
              />
              {{item.label}}
              <span class="${cx("count")}">
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

      <ng-ais-footer [footer]="footer" className="${cx(
        "footer"
      )}"></ng-ais-footer>
    </div>
  `
})
export class NgAisRefinementList extends BaseWidget {
  // render options
  @Input() public showMoreLabel: string = "Show more";
  @Input() public showLessLabel: string = "Show less";

  // connectors options
  @Input() public attributeName: string;
  @Input() public operator: "or" | "and" = "or";
  @Input() public limit: number | string = 10;
  @Input() public showMoreLimit: number | string;
  @Input() public sortBy: string[] | ((item: object) => number);

  public state = {
    canRefine: false,
    canToggleShowMore: false,
    createURL: noop,
    isShowingMore: false,
    items: [],
    refine: noop,
    toggleShowMore: noop
  };

  constructor(searchInstance: NgAisInstance) {
    super(searchInstance);
  }

  public ngOnInit() {
    // limit & showMoreLimit can be interferred as string from props
    // so we need to transform them back to number
    const limit =
      typeof this.limit === "string" ? parseInt(this.limit, 10) : this.limit;

    const showMoreLimit =
      typeof this.showMoreLimit === "string"
        ? parseInt(this.showMoreLimit, 10)
        : this.showMoreLimit;

    this.createWidget(connectRefinementList, {
      limit,
      showMoreLimit,
      attributeName: this.attributeName,
      sortBy: this.sortBy
    });

    super.ngOnInit();
  }

  public refine(event, item) {
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
