import { createRenderer } from "../../../helpers/test-renderer";
import { NgAisSearchBox } from "../search-box";

const defaultState = {
  query: "foo",
  refine: jest.fn()
};

const render = createRenderer({
  defaultState,
  template: "<ais-search-box></ais-search-box>",
  TestedWidget: NgAisSearchBox
});

describe("SearchBox", () => {
  it("renders markup without state", () => {
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it("renders markup with state", () => {
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });
});
