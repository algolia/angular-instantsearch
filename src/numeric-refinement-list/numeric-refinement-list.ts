import { Component, Input } from "@angular/core";
import { connectNumericRefinementList } from "instantsearch.js/es/connectors";
import { noop } from "lodash";

import BaseWidget from "../base-widget";
import { NgISInstance } from "../instantsearch/instantsearch-instance";
import { bem } from "../utils";

const cx = bem("NumericRefinementList");

@Component({
  selector: "ngis-numeric-refinement-list",
  template: `
    <div class="${cx()}">
      <ngis-header [header]="header" className="${cx("header")}"></ngis-header>

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
                class="${cx("radio")}"
                type="radio"
                name="NumericRefinementList"
                [checked]="item.isRefined"
              />
              {{item.label}}
            </label>
          </li>
        </ul>
      </div>

      <ngis-footer [footer]="footer" className="${cx("footer")}"></ngis-footer>
    </div>
  `
})
export class NgISNumericRefinementList extends BaseWidget {
  @Input() public attributeName: string;
  @Input()
  public options: Array<{
    name: string;
    start?: number;
    end?: number;
  }>;

  public state = {
    createURL: noop,
    items: [],
    refine: noop
  };

  constructor(searchInstance: NgISInstance) {
    super(searchInstance);
  }

  public ngOnInit() {
    this.createWidget(connectNumericRefinementList, {
      attributeName: this.attributeName,
      options: this.options
    });
    super.ngOnInit();
  }

  public refine(event, item) {
    event.preventDefault();
    event.stopPropagation();
    this.state.refine(item.value);
  }
}
