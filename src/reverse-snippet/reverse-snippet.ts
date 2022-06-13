import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Hit } from 'instantsearch.js';
import { reverseSnippet } from 'instantsearch.js/es/helpers';

@Component({
  selector: 'ais-reverse-snippet',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="ais-ReverseSnippet" [innerHtml]="content"></span>`,
})
export class NgAisReverseSnippet {
  @Input() attribute: string;
  @Input() hit: Partial<Hit>;
  @Input() highlightedTagName: string = 'mark';

  get content() {
    return reverseSnippet({
      attribute: this.attribute,
      hit: this.hit,
      highlightedTagName: this.highlightedTagName,
    });
  }
}
