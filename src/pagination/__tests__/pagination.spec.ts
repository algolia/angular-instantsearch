import { createRenderer } from "../../../helpers/test-renderer";
import { NgAisPagination } from "../pagination";

import { bem } from "../../utils";

const cx = bem("Pagination");

const defaultState = {
  createURL: jest.fn(),
  currentRefinement: 0,
  nbHits: 100,
  nbPages: 20,
  refine: jest.fn()
};

const render = createRenderer({
  defaultState,
  template: "<ng-ais-pagination></ng-ais-pagination>",
  TestedWidget: NgAisPagination
});

describe("Pagination", () => {
  it("renders markup without state", () => {
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it("renders with pages in state", () => {
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });

  it("renders does not uses pagesPadding when nbPages < pagesPadding * 2 + 1", () => {
    const fixture = render({ nbPages: 5 });
    const pages = fixture.debugElement.nativeElement.querySelectorAll(
      "." + cx("item", "page")
    );

    expect(pages.length).toBe(5);
    expect(fixture).toMatchSnapshot();
  });

  it("should refine when clicking a page", () => {
    const refine = jest.fn();
    const fixture = render({ refine });

    const el = fixture.debugElement.nativeElement;
    const [, secondPage] = el.querySelectorAll("." + cx("item", "page"));
    secondPage.click();

    expect(refine).toHaveBeenCalled();
    expect(refine).toHaveBeenCalledWith(1);

    fixture.componentInstance.testedWidget.state.currentRefinement = 3;
    fixture.detectChanges();

    const previous = el.querySelector("." + cx("item", "previousPage"));
    previous.click();

    expect(refine).toHaveBeenLastCalledWith(2);

    const next = el.querySelector("." + cx("item", "nextPage"));
    next.click();

    expect(refine).toHaveBeenLastCalledWith(4);
  });

  it("should display last page button", () => {
    const refine = jest.fn();
    const fixture = render({ refine });

    fixture.componentInstance.testedWidget.showLast = true;
    fixture.detectChanges();

    const lastPage = fixture.debugElement.nativeElement.querySelector(
      "." + cx("item", "lastPage")
    );

    lastPage.click();

    expect(refine).toHaveBeenCalled();
    expect(refine).toHaveBeenCalledWith(defaultState.nbPages);
  });
});
