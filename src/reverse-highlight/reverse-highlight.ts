import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Hit } from 'instantsearch.js';
import { reverseHighlight } from 'instantsearch.js/es/helpers';

@Component({
  selector: 'ais-reverse-highlight',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="ais-ReverseHighlight" [innerHtml]="content"></span>`,
})
export class NgAisReverseHighlight {
  @Input() attribute: string;
  @Input() hit: Partial<Hit>;
  @Input() highlightedTagName: string = 'mark';

  get content() {
    return reverseHighlight({
      attribute: this.attribute,
      hit: this.hit,
      highlightedTagName: this.highlightedTagName,
    });
  }
}
