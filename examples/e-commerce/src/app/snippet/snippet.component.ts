import { Component, Input } from '@angular/core';
import { snippet } from 'instantsearch.js/es/helpers';

@Component({
  selector: 'app-snippet',
  template: `<span class="ais-Snippet" [innerHtml]="content"></span>`,
})
export class Snippet {
  @Input() attribute: string;
  @Input() hit: { _snippetResult?: {}; label?: string; highlighted?: string };
  @Input() tagName: string = 'mark';

  get content() {
    return snippet({
      attribute: this.attribute,
      highlightedTagName: this.tagName,
      hit: this.hit,
    });
  }
}
