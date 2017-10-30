import { TestBed } from "@angular/core/testing";

import { NgAisInstantSearchModule } from "../../instantsearch/instantsearch.module";
import { NgAisPriceRangesModule } from "../price-ranges.module";
import { NgAisPriceRanges } from "../price-ranges";

jest.mock("../../base-widget");

const defaultState = {
  items: [{ from: 1 }, { from: 10, to: 20 }, { to: 50 }],
  refine: jest.fn()
};

const render = (state?: {}) => {
  const fixture = TestBed.createComponent(NgAisPriceRanges);

  if (state) {
    fixture.componentInstance.updateState({ ...defaultState, ...state }, false);
  }

  fixture.detectChanges();
  return fixture;
};

describe("PriceRanges", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [],
      imports: [NgAisInstantSearchModule.forRoot(), NgAisPriceRangesModule]
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

  it("renders refined values", () => {
    const fixture = render({ items: [{ to: 20, isRefined: true }] });
    expect(fixture).toMatchSnapshot();
  });

  it("should call `refine()` on item click", () => {
    const refine = jest.fn();
    const fixture = render({ refine });

    const [, secondItem] = fixture.debugElement.nativeElement.querySelectorAll(
      "li"
    );
    secondItem.click();

    expect(refine).toHaveBeenCalled();
    expect(refine).toHaveBeenCalledWith(defaultState.items[1]);
  });
});
