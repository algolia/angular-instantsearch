import { Component, Input } from "@angular/core";
import { connectMenu } from "instantsearch.js/es/connectors";
import { noop, isFunction } from "lodash-es";

import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
import { parseNumberInput } from "../utils";

export type MenuState = {
  canRefine: boolean;
  canToggleShowMore: boolean;
  createURL: Function;
  isShowingMore: boolean;
  items: {}[];
  refine: Function;
  toggleShowMore: Function;
};

@Component({
  selector: "ng-ais-menu",
  template: `
    <div [class]="cx()">
      <ng-ais-header [header]="header" [className]="cx('header')"></ng-ais-header>

      <div [class]="cx('body')">
        <ul [class]="cx('list')">
          <li
            [class]="cx('item') + (item.isRefined ? (' ' + cx('item', 'selected')) : '')"
            *ngFor="let item of items"
            (click)="handleClick($event, item.value)"
          >
            <a
              href="{{state.createURL(item.value)}}"
              (click)="handleClick($event, item.value)"
            >
              {{item.label}}
              <span [class]="cx('count')">{{item.count}}</span>
            </a>
          </li>
        </ul>

        <button
          *ngIf="state.canToggleShowMore"
          (click)="state.toggleShowMore()"
          [class]="cx('showMore') + (!state.canToggleShowMore ? (' ' + cx('showMore', 'disabled')) : '')"
        >
          {{state.isShowingMore ? showLessLabel : showMoreLabel}}
        </button>
      </div>

      <ng-ais-footer [footer]="footer" [className]="cx('footer')"></ng-ais-footer>
    </div>
  `
})
export class NgAisMenu extends BaseWidget {
  // render options
  @Input() public showMoreLabel: string = "Show more";
  @Input() public showLessLabel: string = "Show less";
  @Input() public transformItems?: Function;

  // connector options
  @Input() public attributeName: string;
  @Input() public limitMin?: number | string = 10;
  @Input() public limitMax?: number | string;
  @Input() public sortBy?: string[] | ((item: object) => number);

  public state: MenuState = {
    canRefine: false,
    canToggleShowMore: false,
    createURL: noop,
    isShowingMore: false,
    items: [],
    refine: noop,
    toggleShowMore: noop
  };

  get items() {
    return isFunction(this.transformItems)
      ? this.transformItems(this.state.items)
      : this.state.items;
  }

  constructor(searchInstance: NgAisInstance) {
    super(searchInstance, "Menu");
  }

  public ngOnInit() {
    this.createWidget(connectMenu, {
      limit: parseNumberInput(this.limitMin),
      showMoreLimit: parseNumberInput(this.limitMax),
      attributeName: this.attributeName,
      sortBy: this.sortBy
    });

    super.ngOnInit();
  }

  handleClick(event: MouseEvent, value: string) {
    event.preventDefault();
    event.stopPropagation();

    this.state.refine(value);
  }
}
