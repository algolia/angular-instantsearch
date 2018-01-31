import { createRenderer } from "../../../helpers/test-renderer";
import { NgAisRangeSlider } from "../range-slider";

const defaultState = {
  range: { min: 0, max: 200 },
  refine: jest.fn(),
  start: [0, 200]
};

const render = createRenderer({
  defaultState,
  template: "<ng-ais-range-slider></ng-ais-range-slider>",
  TestedWidget: NgAisRangeSlider
});

describe("RangeSlider", () => {
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

    fixture.componentInstance.testedWidget.handleChange([10, 50]);

    expect(refine).toHaveBeenCalled();
    expect(refine).toHaveBeenCalledWith([10, 50]);
  });
});
