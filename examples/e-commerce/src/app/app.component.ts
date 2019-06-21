import { Component } from '@angular/core';
import algoliasearch from 'algoliasearch/lite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  config = {
    searchClient: algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76'),
    indexName: 'instant_search',
    routing: true,
  };

  onKeyUp = event => {
    if (event.key !== 'Escape') {
      return;
    }
    this.closeFilters();
  };

  public openFilters() {
    document.body.classList.add('filtering');
    window.scrollTo(0, 0);
    window.addEventListener('keyup', this.onKeyUp);
  }

  public closeFilters() {
    document.body.classList.remove('filtering');
    const resultsContainer = document.querySelector('.container-results');
    resultsContainer.scrollIntoView();
    window.removeEventListener('keyup', this.onKeyUp);
  }
}
