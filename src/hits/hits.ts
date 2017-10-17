import { Component, ContentChild, OnInit, TemplateRef } from "@angular/core";
import { connectHits } from "instantsearch.js/es/connectors";

import { NgISInstance } from "../instantsearch/instantsearch-instance";

@Component({
  selector: "ngis-hits",
  template: `
    <div class="hits">
      <ng-container *ngTemplateOutlet="template; context: state"></ng-container>

      <!-- default rendering if no template specified -->
      <div *ngIf="!template">
        <div *ngFor="let hit of state.hits">
          {{hit.name}}
        </div>
      </div>
    </div>
  `
})
export class NgISHits implements OnInit {
  @ContentChild(TemplateRef) public template;

  public state: { hits: Array<{}> } = { hits: [] };

  constructor(private searchInstance: NgISInstance) {}

  public ngOnInit() {
    const widget = connectHits(this.updateState);
    this.searchInstance.addWidget(widget());
  }

  private updateState = (state, isFirstRendering) => {
    if (isFirstRendering) {
      return Promise.resolve().then(() => {
        this.state = state;
      });
    }

    this.state = state;
  };
}
