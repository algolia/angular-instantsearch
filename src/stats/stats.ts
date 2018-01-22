import {
  Component,
  ContentChild,
  TemplateRef,
  Inject,
  PLATFORM_ID
} from "@angular/core";
import { connectStats } from "instantsearch.js/es/connectors";

import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";

@Component({
  selector: "ng-ais-stats",
  template: `
    <div [class]="cx()">
      <ng-container *ngTemplateOutlet="template; context: templateContext">
      </ng-container>

      <span *ngIf="!template" [class]="cx('text')">
        {{state.nbHits}} results found in {{state.processingTimeMS}}ms.
      </span>
    </div>
  `
})
export class NgAisStats extends BaseWidget {
  @ContentChild(TemplateRef) public template: any;

  public state = {
    hitPerPage: 0,
    nbHits: 0,
    nbPages: 0,
    page: 0,
    processingTimeMS: 0,
    query: ""
  };

  get templateContext() {
    return { state: this.state };
  }

  constructor(
    @Inject(PLATFORM_ID) public platformId: Object,
    searchInstance: NgAisInstance
  ) {
    super(searchInstance, "Stats");
    this.createWidget(connectStats);
  }
}
