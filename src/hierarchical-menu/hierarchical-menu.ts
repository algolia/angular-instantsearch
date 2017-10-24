import { Component, Input } from "@angular/core";
import { connectHierarchicalMenu } from "instantsearch.js/es/connectors";
import { noop } from "lodash";

import BaseWidget from "../base-widget";
import { NgISInstance } from "../instantsearch/instantsearch-instance";
import { bem } from "../utils";

const cx = bem("HierarchicalMenu");

@Component({
  selector: "ngis-hierarchical-menu",
  template: `
    <div class='${cx()}'>
      <ngis-header [header]="header" className="${cx("header")}"></ngis-header>

      <div class="${cx("body")}">
        <ul class="${cx("list")} ${cx("list", "lvl0")}">
          <ngis-hierarchical-menu-item
            *ngFor="let item of state.items"
            [item]="item"
            [createURL]="state.createURL"
            [refine]="state.refine"
          >
          </ngis-hierarchical-menu-item>
        </ul>
      </div>

      <ngis-footer [footer]="footer" className="${cx("footer")}"></ngis-footer>
    </div>
  `
})
export class NgISHierarchicalMenu extends BaseWidget {
  // connector options
  @Input() public attributes: string[];
  @Input() public separator?: string = ">";
  @Input() public rootPath?: string;
  @Input() public showParentLevel?: boolean;
  @Input() public limit?: number | string = 10;
  @Input() public sortBy?: string[] | ((item: object) => number);

  public state = {
    createURL: noop,
    items: [],
    refine: noop
  };

  constructor(searchInstance: NgISInstance) {
    super(searchInstance);
  }

  public ngOnInit() {
    // limit can be interferred as string from props
    const limit =
      typeof this.limit === "string" ? parseInt(this.limit, 10) : this.limit;

    this.createWidget(connectHierarchicalMenu, {
      attributes: this.attributes,
      limit,
      rootPath: this.rootPath,
      separator: this.separator,
      showParentLevel: this.showParentLevel,
      sortBy: this.sortBy
    });

    super.ngOnInit();
  }
}
