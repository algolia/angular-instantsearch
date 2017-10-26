import { Component, Input } from "@angular/core";
import { connectNumericRefinementList } from "instantsearch.js/es/connectors";
import { noop } from "lodash";

import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
import { bem } from "../utils";

const cx = bem("NumericRefinementList");

@Component({
  selector: "ng-ais-numeric-refinement-list",
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

      <ng-ais-footer [footer]="footer" className="${cx(
        "footer"
      )}"></ng-ais-footer>
    </div>
  `
})
export class NgAisNumericRefinementList extends BaseWidget {
  @Input() public attributeName: string;
  @Input()
  public options: {
    name: string;
    start?: number;
    end?: number;
  }[];

  public state = {
    createURL: noop,
    items: [],
    refine: noop
  };

  constructor(searchInstance: NgAisInstance) {
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
