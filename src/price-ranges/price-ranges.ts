import { Component, Input } from "@angular/core";
import { connectPriceRanges } from "instantsearch.js/es/connectors";
import { noop } from "lodash";

import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
import { bem } from "../utils";

const cx = bem("PriceRanges");

@Component({
  selector: "ng-ais-price-ranges",
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
            (click)="handleClick($event, item)"
          >
            {{formatLabel(item)}}
          </li>
        </ul>
      </div>

      <ng-ais-footer [footer]="footer" className="${cx(
        "footer"
      )}"></ng-ais-footer>
    </div>
  `
})
export class NgAisPriceRanges extends BaseWidget {
  // render options
  @Input() public currency: string = "$";
  @Input() public formatLabel = this.defaultFormatLabel;

  // connector options
  @Input() public attributeName: string;

  public state = {
    items: [],
    refine: noop
  };

  constructor(searchInstance: NgAisInstance) {
    super(searchInstance);
  }

  public ngOnInit() {
    this.createWidget(connectPriceRanges, {
      attributeName: this.attributeName
    });
    super.ngOnInit();
  }

  public defaultFormatLabel({ from, to }) {
    if (to === undefined) {
      return `>= ${this.currency} ${from}`;
    }
    if (from === undefined) {
      return `<= ${this.currency} ${to}`;
    }
    return `${this.currency} ${from} - ${this.currency} ${to}`;
  }

  public handleClick(event, item) {
    event.preventDefault();
    this.state.refine(item);
  }
}
