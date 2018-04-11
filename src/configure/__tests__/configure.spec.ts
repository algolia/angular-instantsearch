import { createRenderer } from "../../../helpers/test-renderer";
import { NgAisConfigure } from "../configure";

describe("Configure", () => {
  it("renders markup without state", () => {
    const render = createRenderer({
      TestedWidget: NgAisConfigure,
      template: "<ais-configure></ais-configure>"
    });
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });
});
