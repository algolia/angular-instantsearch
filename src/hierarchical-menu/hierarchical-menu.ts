import { Component, Input } from "@angular/core";
import { connectHierarchicalMenu } from "instantsearch.js/es/connectors";
import { noop } from "lodash";

import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
import { bem, parseNumberInput } from "../utils";

const cx = bem("HierarchicalMenu");

@Component({
  selector: "ng-ais-hierarchical-menu",
  template: `
    <div class='${cx()}'>
      <ng-ais-header [header]="header" className="${cx(
        "header"
      )}"></ng-ais-header>

      <div class="${cx("body")}">
        <ul class="${cx("list")} ${cx("list", "lvl0")}">
          <ng-ais-hierarchical-menu-item
            *ngFor="let item of state.items"
            [item]="item"
            [createURL]="state.createURL"
            [refine]="state.refine"
          >
          </ng-ais-hierarchical-menu-item>
        </ul>
      </div>

      <ng-ais-footer [footer]="footer" className="${cx(
        "footer"
      )}"></ng-ais-footer>
    </div>
  `
})
export class NgAisHierarchicalMenu extends BaseWidget {
  // connector options
  @Input() public attributes: string[];
  @Input() public separator?: string = " > ";
  @Input() public rootPath?: string;
  @Input() public showParentLevel?: boolean;
  @Input() public limit?: number | string = 10;
  @Input() public sortBy?: string[] | ((item: object) => number);

  public state = {
    createURL: noop,
    items: [],
    refine: noop
  };

  constructor(searchInstance: NgAisInstance) {
    super(searchInstance);
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
