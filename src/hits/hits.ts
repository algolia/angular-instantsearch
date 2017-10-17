import {
  Component,
  ContentChild,
  OnDestroy,
  OnInit,
  TemplateRef
} from "@angular/core";

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
export class NgISHits implements OnInit, OnDestroy {
  @ContentChild(TemplateRef) public template;

  public state: { hits: Array<{}> } = { hits: [] };

  private widget?: Widget;

  constructor(private searchInstance: NgISInstance) {}

  public ngOnInit() {
    this.widget = connectHits(this.updateState)();
    this.searchInstance.addWidget(this.widget);
  }

  public ngOnDestroy() {
    this.searchInstance.removeWidget(this.widget);
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
