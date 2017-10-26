import { Component, Input } from "@angular/core";
import { connectToggle } from "instantsearch.js/es/connectors";
import { noop } from "lodash";

import BaseWidget from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
import { bem } from "../utils";

const cx = bem("Toggle");

@Component({
  selector: "ng-ais-toggle",
  template: `
    <div class="${cx()}">
      <ng-ais-header [header]="header" className="${cx("header")}"></ng-ais-header>

      <div class="${cx("body")}">
        <ul class="${cx("list")}">
          <li
            class="${cx("item")}"
            (click)="handleClick($event)">
            <label class="${cx("label")}">
              <input
                class="${cx("checkbox")}"
                type="checkbox"
                value="{{state.value.name}}"
                [checked]="state.value.isRefined"
              />
              {{label || state.value.name}}
              <span class="${cx("count")}">
                {{state.value.count}}
              </span>
            </label>
          </li>
        </ul>
      </div>

      <ng-ais-footer [footer]="footer" className=${cx("footer")}></ng-ais-footer>
    </div>
  `
})
export class NgAisToggle extends BaseWidget {
  // connector options
  @Input() public attributeName: string;
  @Input() public label: string;
  @Input()
  public values: { on?: boolean; off?: boolean } = { on: true, off: undefined };

  public state = {
    createURL: noop,
    refine: noop,
    value: {}
  };

  constructor(searchInstance: NgAisInstance) {
    super(searchInstance);
  }

  public ngOnInit() {
    this.createWidget(connectToggle, {
      attributeName: this.attributeName,
      label: this.label,
      values: this.values
    });
    super.ngOnInit();
  }

  public handleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    this.state.refine(this.state.value);
  }
}
