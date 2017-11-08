import { Input, Component, ContentChild, TemplateRef } from "@angular/core";
import { connectHits } from "instantsearch.js/es/connectors";
import { isFunction } from "lodash";

import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
import { bem } from "../utils";

const cx = bem("Hits");

@Component({
  selector: "ng-ais-hits",
  template: `
    <div class="${cx()}">
      <ng-ais-header [header]="header" className="${cx(
        "header"
      )}"></ng-ais-header>

      <div class="${cx("body")}">
        <ng-container *ngTemplateOutlet="template; context: state"></ng-container>

        <!-- default rendering if no template specified -->
        <div *ngIf="!template">
          <ul class="${cx("list")}">
            <li
              class="${cx("item")}"
              *ngFor="let hit of hits"
            >
              <ng-ais-highlight attributeName="name" [hit]="hit">
              </ng-ais-highlight>
            </li>
          </ul>
        </div>
      </div>

      <ng-ais-footer [footer]="footer" className=${cx(
        "footer"
      )}></ng-ais-footer>
    </div>
  `
})
export class NgAisHits extends BaseWidget {
  @ContentChild(TemplateRef) public template;

  // render options
  @Input() transformItems?: Function;

  // inner widget state returned from connector
  public state = { hits: [] };

  get hits() {
    return isFunction(this.transformItems)
      ? this.transformItems(this.state.hits)
      : this.state.hits;
  }

  constructor(searchInstance: NgAisInstance) {
    super(searchInstance);
    this.createWidget(connectHits);
  }
}
