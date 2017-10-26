import { Component, Input } from "@angular/core";
import { connectStarRating } from "instantsearch.js/es/connectors";
import { noop } from "lodash";

import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
import { bem } from "../utils";

const cx = bem("StarRating");

@Component({
  selector: "ng-ais-star-rating",
  template: `
    <div class="${cx()}">
      <ng-ais-header [header]="header" className="${cx(
        "header"
      )}"></ng-ais-header>

      <div class="${cx("body")}">
        <svg xmlns="http://www.w3.org/2000/svg" style="display:none;">
          <symbol
            id="ais-StarRating-starSymbol"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z"/>
          </symbol>
          <symbol
            id="ais-StarRating-starEmptySymbol"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path d="M12 6.76l1.379 4.246h4.465l-3.612 2.625 1.379 4.246-3.611-2.625-3.612 2.625 1.379-4.246-3.612-2.625h4.465l1.38-4.246zm0-6.472l-2.833 8.718h-9.167l7.416 5.389-2.833 8.718 7.417-5.388 7.416 5.388-2.833-8.718 7.417-5.389h-9.167l-2.833-8.718z"/>
          </symbol>
        </svg>

        <ul class="${cx("list")}">
          <li
            *ngFor="let item of state.items"
            [ngClass]="{
              '${cx("item")}': true,
              '${cx("item", "selected")}': item.isRefined
            }"
          >
            <button
              class="${cx("button")}"
              [attr.aria-label]="item.name + ' stars & up'"
            >
              <svg
                *ngFor="let star of item.stars"
                class="${cx("starIcon")}"
                aria-hidden="true"
              >
                <use
                  *ngIf="star"
                  xlink:href="#ais-StarRating-starSymbol"
                >
                </use>

                <use
                  *ngIf="!star"
                  xlink:href="#ais-StarRating-starEmptySymbol"
                >
                </use>
              </svg>

              <span class="${cx("label")}" aria-hidden="true">
                {{andUpLabel}}
              </span>

              <span class="${cx("count")}">
                {{item.count}}
              </span>
            </button>
          </li>
        </ul>
      </div>

      <ng-ais-footer [footer]="footer" className="${cx(
        "footer"
      )}"></ng-ais-footer>
    </div>
  `
})
export class NgAisStarRating extends BaseWidget {
  // render options
  @Input() public andUpLabel: string = "& Up";

  // connectors options
  @Input() public attributeName: string;
  @Input() public max?: number = 5;

  public state = {
    createURL: noop,
    hasNoResults: false,
    items: [],
    refine: noop
  };

  constructor(searchInstance: NgAisInstance) {
    super(searchInstance);
  }

  public ngOnInit() {
    this.createWidget(connectStarRating, {
      attributeName: this.attributeName,
      max: this.max
    });
    super.ngOnInit();
  }
}
