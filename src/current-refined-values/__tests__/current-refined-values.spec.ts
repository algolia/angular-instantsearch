import { TestBed } from "@angular/core/testing";

import { NgAisInstantSearchModule } from "../../instantsearch/instantsearch.module";
import { NgAisCurrentRefinedValuesModule } from "../current-refined-values.module";
import { NgAisCurrentRefinedValues } from "../current-refined-values";

import { bem } from "../../utils";

jest.mock("../../base-widget");

const cx = bem("CurrentRefinedValues");

const defaultState = {
  attributes: {},
  clearAllClick: jest.fn(),
  clearAllURL: jest.fn(),
  createURL: jest.fn(),
  refined: jest.fn(),
  refinements: [
    {
      type: "disjunctive",
      attributeName: "brand",
      name: "Canon",
      count: 27,
      exhaustive: true,
      computedLabel: "Canon"
    },
    {
      type: "disjunctive",
      attributeName: "brand",
      name: "Sony",
      count: 28,
      exhaustive: true,
      computedLabel: "Sony"
    },
    {
      type: "hierarchical",
      attributeName: "hierarchicalCategories.lvl0",
      name: "Cameras & Camcorders",
      count: 55,
      computedLabel: "Cameras & Camcorders"
    },
    {
      type: "numeric",
      attributeName: "popularity",
      name: "0",
      numericValue: 0,
      operator: ">=",
      computedLabel: "≥ 0"
    }
  ]
};

const render = (state?: {}) => {
  const fixture = TestBed.createComponent(NgAisCurrentRefinedValues);

  if (state) {
    fixture.componentInstance.updateState({ ...defaultState, ...state }, false);
  }

  fixture.detectChanges();
  return fixture;
};

describe("CurrentRefinedValues", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        NgAisInstantSearchModule.forRoot(),
        NgAisCurrentRefinedValuesModule
      ]
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

  it("should call refine() when clicking on an refined element", () => {
    const refine = jest.fn();
    const fixture = render({ refine });

    const [firstEl] = fixture.debugElement.nativeElement.querySelectorAll("li");
    firstEl.click();

    expect(refine).toHaveBeenCalled();
    expect(refine).toHaveBeenCalledWith(defaultState.refinements[0]);
  });

  it("should call clearAllClick() when clicking on clear all", () => {
    const clearAllClick = jest.fn();
    const fixture = render({ clearAllClick });

    fixture.debugElement.nativeElement.querySelector("." + cx("reset")).click();

    expect(clearAllClick).toHaveBeenCalled();
  });
});
