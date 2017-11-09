import { Component, Input } from "@angular/core";
import { isPlainObject, escape, get } from "lodash";
import { bem } from "../utils";

const cx = bem("Highlight")();

@Component({
  selector: "ng-ais-highlight",
  template: `<span [innerHtml]="content"></span>`
})
export class NgAisHighlight {
  @Input() attributeName: string;
  @Input() hit: { _highlightResult?: {} };
  @Input() tagName: string = "em";

  get content() {
    if (this.hit.hasOwnProperty("_highlightResult")) {
      const attributeHighlighted = get(
        this.hit._highlightResult,
        this.attributeName
      );

      // check that the attributeHighlighted is a string
      if (
        isPlainObject(attributeHighlighted) &&
        typeof attributeHighlighted.value === "string"
      ) {
        return this.replaceWithTagName(attributeHighlighted.value);
      }
    }

    const fallback = get(this.hit, this.attributeName);
    if (!fallback) {
      console.warn(
        `Could not find attributeName [${
          this.attributeName
        }] into hit object, will display an empty string.`
      );

      return "";
    }

    return fallback;
  }

  replaceWithTagName(value: string) {
    return value
      .replace(new RegExp("<em>", "g"), `<${this.tagName} class="${cx}">`)
      .replace(new RegExp("</em>", "g"), `</${this.tagName}>`);
  }
}
