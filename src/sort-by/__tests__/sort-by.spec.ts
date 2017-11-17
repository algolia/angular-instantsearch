import { TestBed } from "@angular/core/testing";

import { NgAisInstantSearchModule } from "../../instantsearch/instantsearch.module";
import { NgAisSortByModule } from "../sort-by.module";
import { NgAisSortBy } from "../sort-by";

jest.mock("../../base-widget");

const defaultState = {
  currentRefinement: "foo",
  options: [{ label: "foo", value: "foo" }, { label: "bar", value: "bar" }],
  refine: jest.fn()
};

const render = (state?: {}) => {
  const fixture = TestBed.createComponent(NgAisSortBy);

  if (state) {
    fixture.componentInstance.updateState({ ...defaultState, ...state }, false);
  }

  fixture.detectChanges();
  return fixture;
};

describe("SortBy", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [],
      imports: [NgAisInstantSearchModule.forRoot(), NgAisSortByModule]
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
