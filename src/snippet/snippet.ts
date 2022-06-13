import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Hit } from 'instantsearch.js';
import { snippet } from 'instantsearch.js/es/helpers';

@Component({
  selector: 'ais-snippet',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="ais-Snippet" [innerHtml]="content"></span>`,
})
export class NgAisSnippet {
  @Input() attribute: string;
  @Input() hit: Partial<Hit>;
  @Input() highlightedTagName: string = 'mark';

  get content() {
    return snippet({
      attribute: this.attribute,
      hit: this.hit,
      highlightedTagName: this.highlightedTagName,
    });
  }
}
