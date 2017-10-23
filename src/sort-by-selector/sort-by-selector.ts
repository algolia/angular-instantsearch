import { Component, Input } from "@angular/core";
import { connectSortBySelector } from "instantsearch.js/es/connectors";
import { noop } from "lodash";

import BaseWidget from "../base-widget";
import { NgISInstance } from "../instantsearch/instantsearch-instance";
import { bem } from "../utils";

const cx = bem("SortBySelector");

@Component({
  selector: "ngis-sort-by-selector",
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
            *ngFor="let item of state.options"
            [value]="item.value"
            [selected]="item.value === state.currentRefinement"
          >
            {{item.label}}
          </option>
        </select>
      </div>

      <ngis-footer [footer]="footer" className="${cx("footer")}"></ngis-footer>
    </div>
  `
})
export class NgISSortBySelector extends BaseWidget {
  @Input()
  public indices: Array<{
    name: string;
    label: string;
  }>;

  public state = {
    currentRefinement: null,
    options: [],
    refine: noop
  };

  constructor(searchInstance: NgISInstance) {
    super(searchInstance);
  }

  public ngOnInit() {
    this.createWidget(connectSortBySelector, { indices: this.indices });
    super.ngOnInit();
  }
}
