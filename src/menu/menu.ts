import { Component, Input } from "@angular/core";
import { connectMenu } from "instantsearch.js/es/connectors";
import { noop } from "lodash";

import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
import { bem, parseNumberInput } from "../utils";

const cx = bem("Menu");

@Component({
  selector: "ng-ais-menu",
  template: `
    <div class='${cx()}'>
      <ng-ais-header [header]="header" className="${cx(
        "header"
      )}"></ng-ais-header>

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

      <ng-ais-footer [footer]="footer" className="${cx(
        "footer"
      )}"></ng-ais-footer>
    </div>
  `
})
export class NgAisMenu extends BaseWidget {
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

  constructor(searchInstance: NgAisInstance) {
    super(searchInstance);
  }

  public ngOnInit() {
    this.createWidget(connectMenu, {
      limit: parseNumberInput(this.limit),
      showMoreLimit: parseNumberInput(this.limit),
      attributeName: this.attributeName,
      sortBy: this.sortBy
    });

    super.ngOnInit();
  }
}
