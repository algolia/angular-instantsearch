import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Hit } from 'instantsearch.js';

import { highlight } from 'instantsearch.js/es/helpers';
import { getPropertyByPath } from 'instantsearch.js/es/lib/utils';

@Component({
  selector: 'ais-highlight',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="ais-Highlight" [innerHtml]="content"></span>`,
})
export class NgAisHighlight {
  @Input() attribute: string;
  @Input() hit: Partial<Hit>;
  @Input() tagName: string = 'mark';

  get content() {
    const highlightAttributeResult = getPropertyByPath(
      this.hit._highlightResult,
      this.attribute
    );
    const fallback = getPropertyByPath(this.hit, this.attribute);

    // @MAJOR drop this custom fallback once it is implemented directly in instantsearch.js v5
    if (!highlightAttributeResult && fallback) {
      return fallback;
    }

    return highlight({
      attribute: this.attribute,
      highlightedTagName: this.tagName,
      hit: this.hit,
    });
  }
}
