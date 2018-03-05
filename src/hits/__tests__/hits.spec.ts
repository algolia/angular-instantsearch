import { createRenderer } from "../../../helpers/test-renderer";
import { NgAisHits } from "../hits";
import { NgAisHighlight } from "../../highlight/highlight";

const defaultState = {
  hits: [
    { name: "foo", description: "foo" },
    { name: "bar", description: "bar" },
    { name: "foobar", description: "foobar" },
    { name: "barfoo", description: "barfoo" }
  ],
  results: {}
};

const render = createRenderer({
  defaultState,
  template: "<ais-hits></ais-hits>",
  TestedWidget: NgAisHits,
  additionalDeclarations: [NgAisHighlight]
});

describe("Hits", () => {
  it("renders markup without state", () => {
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it("renders markup with state", () => {
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });

  it("should apply `transformItems` if specified", () => {
    const fixture = render({});
    fixture.componentInstance.testedWidget.transformItems = items =>
      items.map(item => ({ ...item, name: `transformed - ${item.name}` }));
    fixture.componentInstance.testedWidget.updateState(defaultState, false);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
