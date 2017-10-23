import { Component, ContentChild, Input, TemplateRef } from "@angular/core";
import { connectInfiniteHits } from "instantsearch.js/es/connectors";
import { noop } from "lodash";

import BaseWidget from "../base-widget";
import { NgISInstance } from "../instantsearch/instantsearch-instance";
import { bem } from "../utils";

const cx = bem("InfiniteHits");

@Component({
  selector: "ngis-infinite-hits",
  template: `
    <div class="${cx()}">
      <ngis-header [header]="header" className="${cx("header")}"></ngis-header>

      <div class="${cx("body")}">
        <ng-container *ngTemplateOutlet="template; context: state"></ng-container>

        <!-- default rendering if no template specified -->
        <div *ngIf="!template">
          <ul class="${cx("list")}">
            <li
              class="${cx("item")}"
              *ngFor="let hit of state.hits"
            >
              {{hit.name}}
            </li>
          </ul>
        </div>

        <button
          class="${cx("showMore")}"
          (click)="showMore($event)"
        >
          {{showMoreLabel}}
        </button>
      </div>

      <ngis-footer [footer]="footer" className=${cx("footer")}></ngis-footer>
    </div>
  `
})
export class NgISInfiniteHits extends BaseWidget {
  @ContentChild(TemplateRef) public template;
  @Input() public showMoreLabel: string = "Show more results";

  // inner widget state returned from connector
  public state = {
    hits: [],
    isLastPage: false,
    showMore: noop
  };

  constructor(searchInstance: NgISInstance) {
    super(searchInstance);
    this.createWidget(connectInfiniteHits);
  }

  public showMore(event) {
    event.preventDefault();
    this.state.showMore();
  }
}
