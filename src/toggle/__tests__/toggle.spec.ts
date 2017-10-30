import { TestBed } from "@angular/core/testing";

import { NgAisInstantSearchModule } from "../../instantsearch/instantsearch.module";
import { NgAisToggleModule } from "../toggle.module";
import { NgAisToggle } from "../toggle";

jest.mock("../../base-widget");

const defaultState = {
  createURL: jest.fn(),
  refine: jest.fn(),
  value: {
    isRefined: true,
    name: "foobar",
    count: 666
  }
};

const render = (state?: {}) => {
  const fixture = TestBed.createComponent(NgAisToggle);

  if (state) {
    fixture.componentInstance.updateState({ ...defaultState, ...state });
  }

  fixture.detectChanges();
  return fixture;
};

describe("Toggle", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [],
      imports: [NgAisInstantSearchModule.forRoot(), NgAisToggleModule]
    })
  );

  it("should render without state", () => {
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it("should render with state", () => {
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });

  it("should render with a label", () => {
    const fixture = render({});
    fixture.componentInstance.label = "Foo Label";
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it("should call refine on click", () => {
    const refine = jest.fn();
    const fixture = render({ refine });

    const toggle = fixture.debugElement.nativeElement.querySelector("li");
    toggle.click();

    expect(refine).toHaveBeenCalled();
    expect(refine).toHaveBeenCalledWith(defaultState.value);
  });
});
