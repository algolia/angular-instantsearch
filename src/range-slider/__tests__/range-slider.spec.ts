import { TestBed } from "@angular/core/testing";

import { NgAisInstantSearchModule } from "../../instantsearch/instantsearch.module";
import { NgAisRangeSliderModule } from "../range-slider.module";
import { NgAisRangeSlider } from "../range-slider";

jest.mock("../../base-widget");

const defaultState = {
  range: { min: 0, max: 200 },
  refine: jest.fn(),
  start: [0, 200]
};

const render = (state?: {}) => {
  const fixture = TestBed.createComponent(NgAisRangeSlider);

  if (state) {
    fixture.componentInstance.updateState({ ...defaultState, ...state }, true);
  }

  fixture.detectChanges();
  return fixture;
};

describe("RangeSlider", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [],
      imports: [NgAisInstantSearchModule.forRoot(), NgAisRangeSliderModule]
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

  it("should call refine() on slider change", () => {
    const refine = jest.fn();
    const fixture = render({ refine });

    fixture.componentInstance.handleChange([10, 50]);

    expect(refine).toHaveBeenCalled();
    expect(refine).toHaveBeenCalledWith([10, 50]);
  });
});
