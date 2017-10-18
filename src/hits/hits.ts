import { Component, ContentChild, TemplateRef } from "@angular/core";

import { connectHits } from "instantsearch.js/es/connectors";

import BaseWidget from "../base-widget";
import { NgISInstance } from "../instantsearch/instantsearch-instance";
import { bem } from "../utils";

const cx = bem("hits");

@Component({
  selector: "ngis-hits",
  template: `
    <div class="${cx()}">
      <ngis-header
        [header]="header"
        className="${cx("header")}"
      >
      </ngis-header>

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
      </div>

      <ngis-footer [footer]="footer" className=${cx("footer")}></ngis-footer>
    </div>
  `
})
export class NgISHits extends BaseWidget {
  @ContentChild(TemplateRef) public template;

  // inner widget state returned from connector
  public state = { hits: [] };

  constructor(searchInstance: NgISInstance) {
    super(searchInstance);
    this.createWidget(connectHits);
  }
}
