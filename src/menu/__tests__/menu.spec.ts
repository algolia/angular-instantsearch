import { TestBed } from "@angular/core/testing";

import { NgAisInstantSearchModule } from "../../instantsearch/instantsearch.module";
import { NgAisMenuModule } from "../menu.module";
import { NgAisMenu } from "../menu";

jest.mock("../../base-widget");

const defaultState = {
  canRefine: true,
  canToggleShowMore: false,
  createURL: jest.fn(),
  isShowingMore: false,
  items: [
    { value: "foo", label: "foo", count: 2, isRefined: true },
    { value: "bar", label: "bar", count: 3 },
    { value: "foobar", label: "foobar", count: 4 }
  ],
  refine: jest.fn(),
  toggleShowMore: jest.fn()
};

const render = (state?: {}) => {
  const fixture = TestBed.createComponent(NgAisMenu);

  if (state) {
    fixture.componentInstance.updateState({ ...defaultState, ...state });
  }

  fixture.detectChanges();
  return fixture;
};

describe("Menu", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [],
      imports: [NgAisInstantSearchModule.forRoot(), NgAisMenuModule]
    })
  );

  it("renders markup without state", () => {
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it("renders markup with state", () => {
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });

  it("should call refine() when clicking on an element", () => {
    const refine = jest.fn();
    const fixture = render({ refine });

    const [firstItem] = fixture.debugElement.nativeElement.querySelectorAll(
      "li"
    );
    firstItem.click();

    expect(refine).toHaveBeenCalled();
    expect(refine).toHaveBeenCalledWith(defaultState.items[0].value);
  });

  it("should call toggleShowMore() when possible", () => {
    const toggleShowMore = jest.fn();
    const fixture = render({ toggleShowMore, canToggleShowMore: true });

    fixture.componentInstance.limitMin = 3;
    fixture.componentInstance.limitMax = 4;
    fixture.detectChanges();

    fixture.debugElement.nativeElement.querySelector("button").click();

    expect(toggleShowMore).toHaveBeenCalled();
  });

  it("should apply `transformItems` if specified", () => {
    const fixture = render({});
    fixture.componentInstance.transformItems = items =>
      items.map(item => ({ ...item, label: `transformed - ${item.label}` }));
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it("should be hidden with `autoHideContainer`", () => {
    const fixture = render({ items: [] });
    fixture.componentInstance.autoHideContainer = true;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
