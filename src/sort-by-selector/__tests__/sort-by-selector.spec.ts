import { TestBed } from "@angular/core/testing";

import { NgAisInstantSearchModule } from "../../instantsearch/instantsearch.module";
import { NgAisSortBySelectorModule } from "../sort-by-selector.module";
import { NgAisSortBySelector } from "../sort-by-selector";

jest.mock("../../base-widget");

const defaultState = {
  currentRefinement: "foo",
  options: [{ label: "foo", value: "foo" }, { label: "bar", value: "bar" }],
  refine: jest.fn()
};

const render = (state?: {}) => {
  const fixture = TestBed.createComponent(NgAisSortBySelector);

  if (state) {
    fixture.componentInstance.updateState({ ...defaultState, ...state }, false);
  }

  fixture.detectChanges();
  return fixture;
};

describe("SortBySelector", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [],
      imports: [NgAisInstantSearchModule.forRoot(), NgAisSortBySelectorModule]
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

  it("should call refine on select change", () => {
    const refine = jest.fn();
    const fixture = render({ refine });

    const select = fixture.debugElement.nativeElement.querySelector("select");
    select.value = "bar";
    select.dispatchEvent(new Event("change"));

    expect(refine).toHaveBeenCalled();
    expect(refine).toHaveBeenCalledWith("bar");
  });
});
