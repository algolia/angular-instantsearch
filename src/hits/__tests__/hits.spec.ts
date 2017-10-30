import { TestBed } from "@angular/core/testing";

import { NgAisInstantSearchModule } from "../../instantsearch/instantsearch.module";
import { NgAisHitsModule } from "../hits.module";
import { NgAisHits } from "../hits";

jest.mock("../../base-widget");

const defaultState = {
  hits: [
    { name: "foo", description: "foo" },
    { name: "bar", description: "bar" },
    { name: "foobar", description: "foobar" },
    { name: "barfoo", description: "barfoo" }
  ]
};

const render = (state?: {}) => {
  const fixture = TestBed.createComponent(NgAisHits);

  if (state) {
    fixture.componentInstance.updateState({ ...defaultState, ...state }, false);
  }

  fixture.detectChanges();
  return fixture;
};

describe("Hits", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [],
      imports: [NgAisInstantSearchModule.forRoot(), NgAisHitsModule]
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
});
