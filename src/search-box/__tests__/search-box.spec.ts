import { TestBed } from "@angular/core/testing";

import { NgAisInstantSearchModule } from "../../instantsearch/instantsearch.module";
import { NgAisSearchBoxModule } from "../search-box.module";
import { NgAisSearchBox } from "../search-box";

jest.mock("../../base-widget");

const defaultState = {
  query: "foo",
  refine: jest.fn()
};

const render = (state?: {}) => {
  const fixture = TestBed.createComponent(NgAisSearchBox);

  if (state) {
    fixture.componentInstance.updateState({ ...defaultState, ...state }, false);
  }

  fixture.detectChanges();
  return fixture;
};

// FIXME: find way to render SVG

describe("SearchBox", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [],
      imports: [NgAisInstantSearchModule.forRoot(), NgAisSearchBoxModule]
    })
  );

  it.skip("renders markup without state", () => {
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it.skip("renders markup with state", () => {
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });
});
