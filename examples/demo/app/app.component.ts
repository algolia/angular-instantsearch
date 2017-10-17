import { Component } from "@angular/core";
import { NgISInstance } from "angular-instantsearch";

@Component({
  selector: "ngis-app",
  template: `
    <ngis-instantsearch [config]="config">
      <h1>Angular InstantSearch demo</h1>

      <ngis-hits>
        <ng-template let-hits="hits">
          <li *ngFor="let hit of hits">
            {{hit.name}}
          </li>
        </ng-template>
      </ngis-hits>
    </ngis-instantsearch>
  `
})
export class AppComponent {
  public config = {
    apiKey: "6be0576ff61c053d5f9a3225e2a90f76",
    appId: "latency",
    indexName: "instant_search"
  };
}
