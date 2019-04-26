import { Component } from '@angular/core';
import algoliasearch from 'algoliasearch/lite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  config = {
    searchClient: algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76'),
    indexName: 'movies',
  };

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
