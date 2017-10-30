import { TestBed } from "@angular/core/testing";

import { NgAisInstantSearchModule } from "../../instantsearch/instantsearch.module";
import { NgAisNumericSelectorModule } from "../numeric-selector.module";
import { NgAisNumericSelector } from "../numeric-selector";

jest.mock("../../base-widget");

const defaultState = {
  currentRefinement: 10,
  options: [
    { label: "foo", value: 10 },
    { label: "bar", value: 20 },
    { label: "foobar", value: 30 },
    { label: "barfoo", value: 40 }
  ],
  refine: jest.fn()
};

const render = (state?: {}) => {
  const fixture = TestBed.createComponent(NgAisNumericSelector);

  if (state) {
    fixture.componentInstance.updateState({ ...defaultState, ...state }, false);
  }

  fixture.detectChanges();
  return fixture;
};

describe("NumericSelector", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [],
      imports: [NgAisInstantSearchModule.forRoot(), NgAisNumericSelectorModule]
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

  it("should call `refine()` on select change", () => {
    const refine = jest.fn();
    const fixture = render({ refine });

    const select = fixture.debugElement.nativeElement.querySelector("select");
    select.value = "20";
    select.dispatchEvent(new Event("change"));

    expect(refine).toHaveBeenCalled();
    expect(refine).toHaveBeenCalledWith("20");
  });
});
