import { createRenderer } from "../../../helpers/test-renderer";
import { NgAisSearchBox } from "../search-box";

const defaultState = {
  query: "foo",
  refine: jest.fn()
};

const render = createRenderer({
  defaultState,
  template: "<ng-ais-search-box></ng-ais-search-box>",
  TestedWidget: NgAisSearchBox
});

// FIXME: find way to render SVG

describe("SearchBox", () => {
  it.skip("renders markup without state", () => {
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it.skip("renders markup with state", () => {
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });
});
