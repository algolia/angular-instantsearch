import { TestBed } from "@angular/core/testing";

import { NgAisInstantSearchModule } from "../../instantsearch/instantsearch.module";
import { NgAisInfiniteHitsModule } from "../infinite-hits.module";
import { NgAisInfiniteHits } from "../infinite-hits";

jest.mock("../../base-widget");

const defaultState = {
  hits: [
    { name: "foo", description: "foo" },
    { name: "bar", description: "bar" },
    { name: "foobar", description: "foobar" },
    { name: "barfoo", description: "barfoo" }
  ],
  showMore: jest.fn(),
  isLastPage: false
};

const render = (state?: {}) => {
  const fixture = TestBed.createComponent(NgAisInfiniteHits);

  if (state) {
    fixture.componentInstance.updateState({ ...defaultState, ...state }, false);
  }

  fixture.detectChanges();
  return fixture;
};

describe("InfiniteHits", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [],
      imports: [NgAisInstantSearchModule.forRoot(), NgAisInfiniteHitsModule]
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

  it("should call `showMore()` on button click", () => {
    const showMore = jest.fn();
    const fixture = render({ showMore });

    const button = fixture.debugElement.nativeElement.querySelector("button");
    button.click();

    expect(button.disabled).toBeFalsy();
    expect(showMore).toHaveBeenCalled();
  });

  it("should disable `showMore` button", () => {
    const showMore = jest.fn();
    const fixture = render({ showMore, isLastPage: true });

    const button = fixture.debugElement.nativeElement.querySelector("button");
    button.click();

    expect(button.disabled).toBeTruthy();
    expect(showMore).not.toHaveBeenCalled();
  });
});
