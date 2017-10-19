import { Component, Input } from "@angular/core";
import { connectPagination } from "instantsearch.js/es/connectors";
import { noop, range } from "lodash";

import BaseWidget from "../base-widget";
import { NgISInstance } from "../instantsearch/instantsearch-instance";
import { bem } from "../utils";

const cx = bem("pagination");

@Component({
  selector: "ngis-pagination",
  template: `
    <div class="${cx()}">
      <ngis-header [header]="header" className="${cx("header")}"></ngis-header>

      <div class="${cx("body")}">
        <ul class="${cx("list")}">
          <li
            *ngIf="showFirst"
            (click)="refine($event, 0)"
          >
            <a
              href="{{state.createURL(0)}}"
              class="${cx("link")}"
            >
              «
            </a>
          </li>

          <li
            *ngIf="showPrevious"
            (click)="refine($event, state.currentRefinement - 1)"
          >
            <a
              href="{{state.createURL(state.currentRefinement - 1)}}"
              class="${cx("link")}"
            >
              ‹
            </a>
          </li>

          <li
            class="${cx("item", "page")}"
            *ngFor="let page of pages"
            (click)="refine($event, page)"
          >
            <a class="${cx("link")}" href="{{state.createURL(page)}}">
              {{page + 1}}
            </a>
          </li>

          <li
            *ngIf="showNext"
            (click)="refine($event, state.currentRefinement + 1)"
          >
            <a
              href="{{state.createURL(state.currentRefinement + 1)}}"
              class="${cx("link")}"
            >
              ›
            </a>
          </li>

          <li
            *ngIf="showLast"
            (click)="refine($event, state.nbPages)"
          >
            <a
              href="{{state.createURL(state.nbPages)}}"
              class="${cx("link")}"
            >
              »
            </a>
          </li>
        </ul>
      </div>

      <ngis-footer [footer]="footer" className="${cx("footer")}"></ngis-footer>
    </div>
  `
})
export class NgISPagination extends BaseWidget {
  // render options
  @Input() public showFirst: boolean = true;
  @Input() public showLast: boolean = false;
  @Input() public showPrevious: boolean = true;
  @Input() public showNext: boolean = true;
  @Input() public pagesPadding: number | string = 3;

  // connector options
  @Input() public maxPages?: number | string;

  public state = {
    createURL: noop,
    currentRefinement: 0,
    nbHits: 0,
    nbPages: 0,
    refine: noop
  };

  get pages() {
    const { nbPages, currentRefinement } = this.state;

    const pagesArray = Array.apply(null, { length: nbPages }).map(
      Number.call,
      Number
    );

    const pagesPadding =
      typeof this.pagesPadding === "string"
        ? parseInt(this.pagesPadding, 10)
        : this.pagesPadding;

    if (pagesPadding && pagesPadding > 0) {
      const minDelta = currentRefinement - pagesPadding;
      const maxDelta = currentRefinement + pagesPadding;

      if (minDelta < 0) {
        return range(
          0,
          currentRefinement + pagesPadding + Math.abs(minDelta) + 1
        );
      } else if (maxDelta > nbPages) {
        return range(
          currentRefinement - pagesPadding - (maxDelta - nbPages) - 1,
          nbPages
        );
      } else {
        return range(
          currentRefinement - pagesPadding,
          currentRefinement + pagesPadding + 1
        );
      }
    }

    return pagesArray;
  }

  constructor(searchInstance: NgISInstance) {
    super(searchInstance);
  }

  public ngOnInit() {
    this.createWidget(connectPagination, {
      maxPages:
        typeof this.maxPages === "string"
          ? parseInt(this.maxPages, 10)
          : this.maxPages
    });
    super.ngOnInit();
  }

  public refine(event, page: number) {
    event.stopPropagation();
    event.preventDefault();

    if (page < this.state.nbPages && page >= 0) {
      this.state.refine(page);
    }
  }
}
