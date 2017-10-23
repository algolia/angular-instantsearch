import { Component, Input } from "@angular/core";
import { connectPriceRanges } from "instantsearch.js/es/connectors";
import { noop } from "lodash";

import BaseWidget from "../base-widget";
import { NgISInstance } from "../instantsearch/instantsearch-instance";
import { bem } from "../utils";

const cx = bem("PriceRanges");

@Component({
  selector: "ngis-price-ranges",
  template: `
    <div class="${cx()}">
      <ngis-header [header]="header" className="${cx("header")}"></ngis-header>

      <div class="${cx("body")}">
        <ul class="${cx("list")}">
          <li
            class="${cx("item")}"
            *ngFor="let item of state.items"
            (click)="handleClick($event, item)"
          >
            {{formatLabel(item)}}
          </li>
        </ul>
      </div>

      <ngis-footer [footer]="footer" className="${cx("footer")}"></ngis-footer>
    </div>
  `
})
export class NgISPriceRanges extends BaseWidget {
  // render options
  @Input() public currency: string = "$";
  @Input() public formatLabel = this.defaultFormatLabel;

  // connector options
  @Input() public attributeName: string;

  public state = {
    items: [],
    refine: noop
  };

  constructor(searchInstance: NgISInstance) {
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
