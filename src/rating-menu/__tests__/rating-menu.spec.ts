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
  template: "<ng-ais-rating-menu></ng-ais-rating-menu>",
  TestedWidget: NgAisRatingMenu
});

// FIXME: find a way to test when there's SVG

describe("StarRating", () => {
  it.skip("should render without state", () => {
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it.skip("should render with state", () => {
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });

  it.skip("should be hidden with autoHideContainer", () => {
    const fixture = render({ items: [] });
    fixture.componentInstance.testedWidget.autoHideContainer = true;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
