import { TestBed } from "@angular/core/testing";

import { NgAisInstantSearchModule } from "../../instantsearch/instantsearch.module";
import { NgAisBreadcrumbModule } from "../breadcrumb.module";
import { NgAisBreadcrumb } from "../breadcrumb";

jest.mock("../../base-widget");

const defaultState = {
  createURL: jest.fn(),
  items: [{ name: "foo", value: "foo" }, { name: "bar", value: "bar" }],
  refine: jest.fn()
};

const render = (state?: {}) => {
  const fixture = TestBed.createComponent(NgAisBreadcrumb);

  if (state) {
    fixture.componentInstance.updateState({ ...defaultState, ...state }, false);
  }

  fixture.detectChanges();
  return fixture;
};

describe("Breadcrumb", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [],
      imports: [NgAisInstantSearchModule.forRoot(), NgAisBreadcrumbModule]
    })
  );

  it("renders markup without state", () => {
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it("renders markup with two items", () => {
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });

  it("should refine when clicking on first item", () => {
    const refine = jest.fn();
    const fixture = render({ refine });

    const firstLink = fixture.debugElement.nativeElement.querySelector(
      "a:first-child"
    );

    firstLink.click();

    expect(refine).toHaveBeenCalled();
    expect(refine).toHaveBeenCalledWith("foo");
  });

  it("should be hidden with `autoHideContainer`", () => {
    const fixture = render({ items: [] });
    fixture.componentInstance.autoHideContainer = true;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
