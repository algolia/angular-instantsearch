import { Component, Input, Inject, PLATFORM_ID } from "@angular/core";
import { connectBreadcrumb } from "instantsearch.js/es/connectors";
import { noop } from "lodash-es";

import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";

export type BreadcrumbState = {
  createURL: Function;
  items: BreadcrumbItem[];
  refine: Function;
};

export type BreadcrumbItem = {
  name: string;
  value: string;
};

@Component({
  selector: "ng-ais-breadcrumb",
  template: `
    <div [class]="cx()">
      <ng-ais-header [header]="header" [className]="cx('header')"></ng-ais-header>

      <div
        [class]="cx('body')"
        *ngIf="!isHidden"
      >
        <ul [class]="cx('list')">
          <li
            *ngFor="let item of itemsWithSeparator"
            [class]="cx('item')"
            [attr.aria-hidden]="item.separator"
            (click)="handleClick($event, item)"
          >
            {{item.separator ? '>' : ''}}
            <a
              [class]="cx('link')"
              href="{{state.createURL(item.value)}}"
              *ngIf="!item.separator"
              (click)="handleClick($event, item)"
            >
              {{item.name}}
            </a>
          </li>
        </ul>
      </div>

      <ng-ais-footer [footer]="footer" [className]="cx('footer')"></ng-ais-footer>
    </div>
  `
})
export class NgAisBreadcrumb extends BaseWidget {
  // connector options
  @Input() public attributes: string[];
  @Input() public rootPath?: string;

  get isHidden() {
    return this.state.items.length === 0 && this.autoHideContainer;
  }

  get itemsWithSeparator() {
    return this.state.items.reduce(
      (result: {}[], curr, idx) =>
        idx === this.state.items.length - 1
          ? [...result, curr]
          : [...result, curr, { separator: true }],
      []
    );
  }

  public state: BreadcrumbState = {
    createURL: noop,
    items: [],
    refine: noop
  };

  constructor(
    @Inject(PLATFORM_ID) public platformId: Object,
    searchInstance: NgAisInstance
  ) {
    super(searchInstance, "Breadcrumb");
  }

  public ngOnInit() {
    this.createWidget(connectBreadcrumb, {
      attributes: this.attributes,
      rootPath: this.rootPath
    });

    super.ngOnInit();
  }

  public handleClick(event: MouseEvent, item: BreadcrumbItem) {
    event.preventDefault();
    event.stopPropagation();

    if (item.value) {
      this.state.refine(item.value);
    }
  }
}
