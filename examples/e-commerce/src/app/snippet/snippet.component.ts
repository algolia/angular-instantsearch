import { Component, Input } from '@angular/core';
import get from 'lodash/get';

@Component({
  selector: 'app-snippet',
  template: `<span class="ais-Snippet" [innerHtml]="content"></span>`,
})
export class Snippet {
  @Input() attribute: string;
  @Input() hit: { _snippetResult?: {}; label?: string; highlighted?: string };
  @Input() tagName: string = 'em';

  get content() {
    if (this.hit.hasOwnProperty('_snippetResult')) {
      const attributeHighlighted = get(this.hit._snippetResult, this.attribute);

      // check that the attributeHighlighted is a string
      if (
        attributeHighlighted !== undefined &&
        typeof attributeHighlighted.value === 'string'
      ) {
        return this.replaceWithTagName(attributeHighlighted.value);
      }
    }

    const fallback = get(this.hit, this.attribute);
    if (!fallback) {
      console.warn(
        `Could not find attribute [${
          this.attribute
        }] into hit object, will display an empty string.`
      );

      return '';
    }

    return fallback;
  }

  replaceWithTagName(value: string) {
    return value
      .replace(
        new RegExp('<em>', 'g'),
        `<${this.tagName} class="ais-Snippet-highlighted">`
      )
      .replace(new RegExp('</em>', 'g'), `</${this.tagName}>`);
  }
}
