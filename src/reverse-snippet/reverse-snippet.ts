import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Hit } from 'instantsearch.js';
import { reverseSnippet } from 'instantsearch.js/es/helpers';

@Component({
  selector: 'ais-reverse-snippet',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="ais-ReverseSnippet" [innerHtml]="content"></span>`,
})
export class NgAisReverseSnippet {
  @Input() private readonly attribute: string;
  @Input() private readonly hit: Partial<Hit>;
  @Input() private readonly highlightedTagName: string = 'mark';

  get content() {
    return reverseSnippet({
      attribute: this.attribute,
      hit: this.hit,
      highlightedTagName: this.highlightedTagName,
    });
  }
}
