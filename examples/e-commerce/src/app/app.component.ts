import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  instantSearchConfig = {
    appId: "latency",
    apiKey: "6be0576ff61c053d5f9a3225e2a90f76",
    indexName: "ikea"
  };

  transformHits(hits) {
    return hits.map(hit => {
      hit.stars = [];
      for (let i = 1; i <= 5; i) {
        hit.stars.push(i <= hit.rating);
        i += 1;
      }
      return hit;
    });
  }
}
