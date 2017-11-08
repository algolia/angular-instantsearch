import { Component, ContentChild, Input, TemplateRef } from "@angular/core";
import { connectInfiniteHits } from "instantsearch.js/es/connectors";
import { noop } from "lodash";

import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
import { bem } from "../utils";

const cx = bem("InfiniteHits");

@Component({
  selector: "ng-ais-infinite-hits",
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
              *ngFor="let hit of state.hits"
            >
              <ng-ais-highlight attributeName="name" [hit]="hit">
              </ng-ais-highlight>
            </li>
          </ul>
        </div>

        <button
          class="${cx("showMore")}"
          (click)="showMore($event)"
          [disabled]="state.isLastPage"
        >
          {{showMoreLabel}}
        </button>
      </div>

      <ng-ais-footer [footer]="footer" className=${cx(
        "footer"
      )}></ng-ais-footer>
    </div>
  `
})
export class NgAisInfiniteHits extends BaseWidget {
  @ContentChild(TemplateRef) public template;
  @Input() public showMoreLabel: string = "Show more results";

  // inner widget state returned from connector
  public state = {
    hits: [],
    isLastPage: false,
    showMore: noop
  };

  constructor(searchInstance: NgAisInstance) {
    super(searchInstance);
    this.createWidget(connectInfiniteHits);
  }

  public showMore(event) {
    event.preventDefault();
    this.state.showMore();
  }
}
