const get = require('lodash/get');
import { Component, Input } from '@angular/core';
import { bem } from '../utils';
import { highlight } from 'instantsearch.js/es/helpers';

@Component({
  selector: 'ais-highlight',
  template: `<span [class]="cx()" [innerHtml]="content"></span>`,
})
export class NgAisHighlight {
  @Input() attribute: string;
  @Input() hit: { _highlightResult?: {}; label?: string; highlighted?: string };
  @Input() tagName: string = 'mark';

  cx = bem('Highlight');

  get content() {
    if (this.hit.hasOwnProperty('_highlightResult')) {
      return highlight({
        attribute: this.attribute,
        highlightedTagName: this.tagName,
        hit: this.hit,
      });
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
}
