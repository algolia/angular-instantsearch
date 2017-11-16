import { Component, Input } from "@angular/core";
import { connectHierarchicalMenu } from "instantsearch.js/es/connectors";
import { noop, isFunction } from "lodash-es";

import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
import { bem, parseNumberInput } from "../utils";

export type HierarchicalMenuState = {
  createURL: Function;
  items: {}[];
  refine: Function;
};

@Component({
  selector: "ng-ais-hierarchical-menu",
  template: `
    <div [class]="cx()">
      <ng-ais-header [header]="header" [className]="cx('header')"></ng-ais-header>

      <div [class]="cx('body')">
        <ul [class]="cx('list') + ' ' + cx('list', 'lvl0')">
          <ng-ais-hierarchical-menu-item
            *ngFor="let item of items"
            [item]="item"
            [createURL]="state.createURL"
            [refine]="state.refine"
          >
          </ng-ais-hierarchical-menu-item>
        </ul>
      </div>

      <ng-ais-footer [footer]="footer" [className]="cx('footer')"></ng-ais-footer>
    </div>
  `
})
export class NgAisHierarchicalMenu extends BaseWidget {
  // render option
  @Input() public transformItems?: Function;

  // connector options
  @Input() public attributes: string[];
  @Input() public separator?: string = " > ";
  @Input() public rootPath?: string;
  @Input() public showParentLevel?: boolean;
  @Input() public limit?: number | string = 10;
  @Input() public sortBy?: string[] | ((item: object) => number);

  public state: HierarchicalMenuState = {
    createURL: noop,
    items: [],
    refine: noop
  };

  get items() {
    return isFunction(this.transformItems)
      ? this.transformItems(this.state.items)
      : this.state.items;
  }

  constructor(searchInstance: NgAisInstance) {
    super(searchInstance, "HierarchicalMenu");
  }

  public ngOnInit() {
    this.createWidget(connectHierarchicalMenu, {
      limit: parseNumberInput(this.limit),
      attributes: this.attributes,
      rootPath: this.rootPath,
      separator: this.separator,
      showParentLevel: this.showParentLevel,
      sortBy: this.sortBy
    });

    super.ngOnInit();
  }
}
