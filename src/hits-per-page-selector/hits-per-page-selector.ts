import { Component, Input } from "@angular/core";
import { connectHitsPerPage } from "instantsearch.js/es/connectors";
import { noop } from "lodash";

import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
import { bem } from "../utils";

const cx = bem("HitsPerPageSelector");

@Component({
  selector: "ng-ais-hits-per-page-selector",
  template: `
    <div class="${cx()}">
      <ng-ais-header [header]="header" className="${cx(
        "header"
      )}"></ng-ais-header>

      <div class="${cx("body")}">
        <select
          class="${cx("select")}"
          (change)="state.refine($event.target.value)"
        >
          <option
            class="${cx("option")}"
            *ngFor="let item of state.items"
            [value]="item.value"
            [selected]="item.isRefined"
          >
            {{item.label}}
          </option>
        </select>
      </div>

      <ng-ais-footer [footer]="footer" className="${cx(
        "footer"
      )}"></ng-ais-footer>
    </div>
  `
})
export class NgAisHitsPerPageSelector extends BaseWidget {
  @Input()
  public items: {
    value: number;
    label: string;
    default?: boolean;
  }[];

  public state = {
    items: [],
    refine: noop
  };

  constructor(searchInstance: NgAisInstance) {
    super(searchInstance);
  }

  public ngOnInit() {
    this.createWidget(connectHitsPerPage, { items: this.items });
    super.ngOnInit();
  }
}
