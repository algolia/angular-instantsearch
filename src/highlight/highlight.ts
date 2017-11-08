import { Component, Input } from "@angular/core";
import { isPlainObject, escape, get } from "lodash";
import { bem } from "../utils";

const cx = bem("Highlight")();

const tagConfig = {
  highlightPreTag: "__ais-highlight__",
  highlightPostTag: "__/ais-highlight__"
};

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
        return this.replaceWithEmAndEscape(attributeHighlighted.value);
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

  replaceWithEmAndEscape(value: string) {
    return escape(value)
      .replace(new RegExp(tagConfig.highlightPreTag, "g"), `<em class="${cx}">`)
      .replace(new RegExp(tagConfig.highlightPostTag, "g"), "</em>");
  }
}
