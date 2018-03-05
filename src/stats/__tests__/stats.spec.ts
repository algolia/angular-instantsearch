import { createRenderer } from "../../../helpers/test-renderer";
import { NgAisStats } from "../stats";

import { bem } from "../../utils";

const cx = bem("Stats");

const render = createRenderer({
  defaultState: {
    hitPerPage: 20,
    nbHits: 100,
    nbPages: 5,
    page: 0,
    processingTimeMS: 123,
    query: "foobar"
  },
  template: "<ais-stats></ais-stats>",
  TestedWidget: NgAisStats
});

describe("Stats", () => {
  it("should render without state", () => {
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it("should render with state", () => {
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });
});
