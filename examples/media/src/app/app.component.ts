import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  transformHits(hits) {
    hits.forEach(hit => {
      hit.stars = [];
      for (let i = 1; i <= 5; i) {
        hit.stars.push(i <= hit.rating);
        i += 1;
      }
    });
    return hits;
  }
}
