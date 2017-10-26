import { Component, Input } from "@angular/core";
import { connectBreadcrumb } from "instantsearch.js/es/connectors";
import { noop } from "lodash";

import BaseWidget from "../base-widget";
import { NgISInstance } from "../instantsearch/instantsearch-instance";
import { bem } from "../utils";

const cx = bem("Breadcrumb");

@Component({
  selector: "ngis-breadcrumb",
  template: `
    <div class='${cx()}'>
      <ngis-header [header]="header" className="${cx("header")}"></ngis-header>

      <div class="${cx("body")}">
        <ul class="${cx("list")}">
          <li
            *ngFor="let item of itemsWithSeparator"
            class="${cx("item")}"
            [attr.aria-hidden]="item.separator"
            (click)="handleClick($event, item)"
          >
            {{item.separator ? '>' : ''}}
            <a
              class="${cx("link")}"
              href="{{state.createURL(item.value)}}"
              *ngIf="!item.separator"
              (click)="handleClick($event, item)"
            >
              {{item.name}}
            </a>
          </li>
        </ul>
      </div>

      <ngis-footer [footer]="footer" className="${cx("footer")}"></ngis-footer>
    </div>
  `
})
export class NgISBreadcrumb extends BaseWidget {
  // connector options
  @Input() public attributes: string[];
  @Input() public rootPath?: string;

  get itemsWithSeparator() {
    return this.state.items.reduce(
      (result, curr, idx) =>
        idx === this.state.items.length - 1
          ? [...result, curr]
          : [...result, curr, { separator: true }],
      []
    );
  }

  public state = {
    createURL: noop,
    items: [],
    refine: noop
  };

  constructor(searchInstance: NgISInstance) {
    super(searchInstance);
  }

  public ngOnInit() {
    this.createWidget(connectBreadcrumb, {
      attributes: this.attributes,
      rootPath: this.rootPath
    });

    super.ngOnInit();
  }

  public handleClick(event, item) {
    event.preventDefault();
    event.stopPropagation();

    if (item.value) {
      this.state.refine(item.value);
    }
  }
}
