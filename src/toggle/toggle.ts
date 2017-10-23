import { Component, Input } from "@angular/core";
import { connectToggle } from "instantsearch.js/es/connectors";
import { noop } from "lodash";

import BaseWidget from "../base-widget";
import { NgISInstance } from "../instantsearch/instantsearch-instance";
import { bem } from "../utils";

const cx = bem("Toggle");

@Component({
  selector: "ngis-toggle",
  template: `
    <div class="${cx()}">
      <ngis-header [header]="header" className="${cx("header")}"></ngis-header>

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

      <ngis-footer [footer]="footer" className=${cx("footer")}></ngis-footer>
    </div>
  `
})
export class NgISToggle extends BaseWidget {
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

  constructor(searchInstance: NgISInstance) {
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
