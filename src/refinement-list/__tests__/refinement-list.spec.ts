import { createRenderer } from "../../../helpers/test-renderer";
import { NgAisRefinementList } from "../refinement-list";
import { NgAisHighlight } from "../../highlight/highlight";

const defaultState = {
  canRefine: true,
  canToggleShowMore: false,
  createURL: jest.fn(),
  isShowingMore: false,
  items: [
    { label: "foo", count: 100, value: "foo", isRefined: false },
    { label: "bar", count: 100, value: "bar", isRefined: false },
    { label: "foobar", count: 100, value: "foobar", isRefined: false },
    { label: "barfoo", count: 100, value: "barfoo", isRefined: false }
  ],
  refine: jest.fn(),
  toggleShowMore: jest.fn()
};

const render = createRenderer({
  defaultState,
  template: "<ng-ais-refinement-list></ng-ais-refinement-list>",
  TestedWidget: NgAisRefinementList,
  additionalDeclarations: [NgAisHighlight]
});

describe("RefinementList", () => {
  it("renders markup without state", () => {
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it("renders markup with state", () => {
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });

  it("should call `toggleShowMore()` on click", () => {
    const toggleShowMore = jest.fn();
    const fixture = render({ toggleShowMore, canToggleShowMore: true });
    fixture.componentInstance.testedWidget.limit = 5;
    fixture.componentInstance.testedWidget.showMoreLimit = 10;
    fixture.detectChanges();

    const showMoreBtn = fixture.debugElement.nativeElement.querySelector(
      "button"
    );
    showMoreBtn.click();

    expect(toggleShowMore).toHaveBeenCalled();
  });

  it("should call `refine()` on item click", () => {
    const refine = jest.fn();
    const fixture = render({ refine });

    const [, secondItem] = fixture.debugElement.nativeElement.querySelectorAll(
      "li"
    );
    secondItem.click();

    expect(refine).toHaveBeenCalled();
    expect(refine).toHaveBeenCalledWith(defaultState.items[1].value);
  });

  it("should apply `transformItems` if specified", () => {
    const fixture = render({});
    fixture.componentInstance.testedWidget.transformItems = items =>
      items.map(item => ({ ...item, label: `transformed - ${item.label}` }));
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it("should call `searchForItems` when searching", () => {
    const searchForItems = jest.fn();
    const fixture = render({ searchForItems });

    // display search box
    fixture.componentInstance.testedWidget.searchable = true;
    fixture.detectChanges();

    const input = fixture.debugElement.nativeElement.querySelector("input");
    input.value = "foobar";
    input.dispatchEvent(new Event("input"));

    expect(searchForItems).toHaveBeenCalled();
    expect(searchForItems).toHaveBeenCalledWith("foobar");
  });

  it("should be hidden with autoHideContainer", () => {
    const fixture = render({ items: [] });
    fixture.componentInstance.testedWidget.autoHideContainer = true;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
