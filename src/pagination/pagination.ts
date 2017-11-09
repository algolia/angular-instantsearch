import { Component, Input } from "@angular/core";
import { connectPagination } from "instantsearch.js/es/connectors";
import { noop, range } from "lodash-es";

import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
import { parseNumberInput } from "../utils";

@Component({
  selector: "ng-ais-pagination",
  templateUrl: "./pagination.html"
})
export class NgAisPagination extends BaseWidget {
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
      // should not display pages that does not exists
      if (nbPages < pagesPadding * 2 + 1) {
        return pagesArray;
      }

      const minDelta = currentRefinement - pagesPadding - 1;
      const maxDelta = currentRefinement + pagesPadding + 1;

      if (minDelta < 0) {
        return range(0, currentRefinement + pagesPadding + Math.abs(minDelta));
      } else if (maxDelta > nbPages) {
        return range(
          currentRefinement - pagesPadding - (maxDelta - nbPages),
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

  constructor(searchInstance: NgAisInstance) {
    super(searchInstance, "Pagination");
  }

  public ngOnInit() {
    this.createWidget(connectPagination, {
      maxPages: parseNumberInput(this.maxPages)
    });
    super.ngOnInit();
  }

  public refine(event: MouseEvent, page: number) {
    event.stopPropagation();
    event.preventDefault();

    if (page <= this.state.nbPages && page >= 0) {
      this.state.refine(page);
    }
  }
}
