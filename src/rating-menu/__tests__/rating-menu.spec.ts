import { createRenderer } from "../../../helpers/test-renderer";
import { NgAisRatingMenu } from "../rating-menu";

import { bem } from "../../utils";

const cx = bem("StarRating");

const defaultState = {
  createURL: jest.fn(),
  hasNoResults: false,
  items: [
    {
      name: "4",
      stars: [true, true, true, true, false],
      count: 100,
      isRefined: true
    },
    { name: "3", stars: [true, true, true, false, false], count: 100 },
    { name: "2", stars: [true, true, false, false, false], count: 100 },
    { name: "1", stars: [true, false, false, false, false], count: 100 }
  ],
  refine: jest.fn()
};

const render = createRenderer({
  defaultState,
  template: "<ais-rating-menu></ais-rating-menu>",
  TestedWidget: NgAisRatingMenu
});

describe("StarRating", () => {
  it("should render without state", () => {
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it("should render with state", () => {
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });

  it("should be hidden with autoHideContainer", () => {
    const fixture = render({ items: [] });
    fixture.componentInstance.testedWidget.autoHideContainer = true;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
