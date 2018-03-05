import { Component, Input } from "@angular/core";
import { isPlainObject, escape, get } from "lodash-es";
import { bem } from "../utils";

@Component({
  selector: "ais-highlight",
  template: `<span [class]="cx()" [innerHtml]="content"></span>`
})
export class NgAisHighlight {
  @Input() attribute: string;
  @Input() hit: { _highlightResult?: {}; label?: string; highlighted?: string };
  @Input() tagName: string = "em";

  cx = bem("Highlight");

  get content() {
    if (this.attribute === "highlighted") {
      return this.hit.highlighted
        ? this.replaceWithTagName(this.hit.highlighted)
        : this.hit.label;
    }

    if (this.hit.hasOwnProperty("_highlightResult")) {
      const attributeHighlighted = get(
        this.hit._highlightResult,
        this.attribute
      );

      // check that the attributeHighlighted is a string
      if (
        isPlainObject(attributeHighlighted) &&
        typeof attributeHighlighted.value === "string"
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

      return "";
    }

    return fallback;
  }

  replaceWithTagName(value: string) {
    return value
      .replace(
        new RegExp("<em>", "g"),
        `<${this.tagName} class="${this.cx("highlighted")}">`
      )
      .replace(new RegExp("</em>", "g"), `</${this.tagName}>`);
  }
}
