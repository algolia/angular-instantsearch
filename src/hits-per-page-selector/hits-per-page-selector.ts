import { Component, Input } from "@angular/core";
import { connectHitsPerPage } from "instantsearch.js/es/connectors";
import { noop } from "lodash";

import BaseWidget from "../base-widget";
import { NgISInstance } from "../instantsearch/instantsearch-instance";
import { bem } from "../utils";

const cx = bem("HitsPerPageSelector");

@Component({
  selector: "ngis-hits-per-page-selector",
  template: `
    <div class="${cx()}">
      <ngis-header [header]="header" className="${cx("header")}"></ngis-header>

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

      <ngis-footer [footer]="footer" className="${cx("footer")}"></ngis-footer>
    </div>
  `
})
export class NgISHitsPerPageSelector extends BaseWidget {
  @Input()
  public items: Array<{
    value: number;
    label: string;
    default?: boolean;
  }>;

  public state = {
    items: [],
    refine: noop
  };

  constructor(searchInstance: NgISInstance) {
    super(searchInstance);
  }

  public ngOnInit() {
    this.createWidget(connectHitsPerPage, { items: this.items });
    super.ngOnInit();
  }
}
