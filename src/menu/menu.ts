import { Component, Input } from "@angular/core";
import { connectMenu } from "instantsearch.js/es/connectors";
import { noop } from "lodash";

import BaseWidget from "../base-widget";
import { NgISInstance } from "../instantsearch/instantsearch-instance";
import { bem } from "../utils";

const cx = bem("Menu");

@Component({
  selector: "ngis-menu",
  template: `
    <div class='${cx()}'>
      <ngis-header [header]="header" className="${cx("header")}"></ngis-header>

      <div class="${cx("body")}">
        <ul class="${cx("list")}">
          <li
            class="${cx("item")}"
            *ngFor="let item of state.items"
            (click)="state.refine(item.value)"
          >
            <a href="{{state.createURL(item.value)}}">
              {{item.label}}
              <span class="${cx("count")}">{{item.count}}</span>
            </a>
          </li>
        </ul>

        <button
          *ngIf="state.canToggleShowMore"
          (click)="state.toggleShowMore()"
        >
          {{state.isShowingMore ? showLessLabel : showMoreLabel}}
        </button>
      </div>

      <ngis-footer [footer]="footer" className="${cx("footer")}"></ngis-footer>
    </div>
  `
})
export class NgISMenu extends BaseWidget {
  // render options
  @Input() public showMoreLabel: string = "Show more";
  @Input() public showLessLabel: string = "Show less";

  // connector options
  @Input() public attributeName: string;
  @Input() public limit?: number | string = 10;
  @Input() public showMoreLimit?: number | string;
  @Input() public sortBy?: string[] | ((item: object) => number);

  public state = {
    canRefine: false,
    canToggleShowMore: false,
    createURL: noop,
    isShowingMore: false,
    items: [],
    refine: noop,
    toggleShowMore: noop
  };

  constructor(searchInstance: NgISInstance) {
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

    this.createWidget(connectMenu, {
      attributeName: this.attributeName,
      limit,
      showMoreLimit,
      sortBy: this.sortBy
    });

    super.ngOnInit();
  }
}
