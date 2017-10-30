import { TestBed } from "@angular/core/testing";

import { NgAisInstantSearchModule } from "../../instantsearch/instantsearch.module";
import { NgAisHierarchicalMenuModule } from "../hierarchical-menu.module";
import { NgAisHierarchicalMenu } from "../hierarchical-menu";

jest.mock("../../base-widget");

const defaultState = {
  items: [
    { name: "one", count: 100, value: "one" },
    {
      name: "two",
      count: 100,
      value: "two",
      isRefined: true,
      data: [
        { name: "six", count: 100, value: "six" },
        { name: "seven", count: 100, value: "seven" },
        { name: "eight", count: 100, value: "eight" },
        { name: "nine", count: 100, value: "nine" }
      ]
    },
    { name: "three", count: 100, value: "three" },
    { name: "four", count: 100, value: "four" },
    { name: "five", count: 100, value: "five" }
  ],
  refine: jest.fn(),
  createURL: jest.fn()
};

const render = (state?: {}) => {
  const fixture = TestBed.createComponent(NgAisHierarchicalMenu);

  if (state) {
    fixture.componentInstance.updateState({ ...defaultState, ...state }, false);
  }

  fixture.detectChanges();
  return fixture;
};

describe("HierarchicalMenu", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [],
      imports: [NgAisInstantSearchModule.forRoot(), NgAisHierarchicalMenuModule]
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

  it("should call refine() on item click", () => {
    const refine = jest.fn();
    const fixture = render({ refine });

    const [firstItem] = fixture.debugElement.nativeElement.querySelectorAll(
      "li"
    );
    firstItem.click();

    expect(refine).toHaveBeenCalled();
    expect(refine).toHaveBeenCalledWith(defaultState.items[0].value);
  });
});
