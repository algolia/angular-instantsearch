import { TestBed } from "@angular/core/testing";

import { NgAisInstantSearchModule } from "../../instantsearch/instantsearch.module";
import { NgAisNumericMenuModule } from "../numeric-menu.module";
import { NgAisNumericMenu } from "../numeric-menu";

jest.mock("../../base-widget");

const defaultState = {
  createURL: jest.fn(),
  items: [
    { label: "10", value: "10", isRefined: true },
    { label: "20", value: "20" }
  ],
  refine: jest.fn()
};

const render = (state?: {}) => {
  const fixture = TestBed.createComponent(NgAisNumericMenu);

  if (state) {
    fixture.componentInstance.updateState({ ...defaultState, ...state });
  }

  fixture.detectChanges();
  return fixture;
};

describe("NumericRefinementList", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [],
      imports: [NgAisInstantSearchModule.forRoot(), NgAisNumericMenuModule]
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

  it("should refine() when item click", () => {
    const refine = jest.fn();
    const fixture = render({ refine });

    const [, item] = fixture.debugElement.nativeElement.querySelectorAll("li");
    item.click();

    expect(refine).toHaveBeenCalled();
    expect(refine).toHaveBeenCalledWith(defaultState.items[1].value);
  });

  it("should check the input of item.isRefined", () => {
    const fixture = render({});
    const [
      firstInput,
      secondInput
    ] = fixture.debugElement.nativeElement.querySelectorAll("input");

    expect(firstInput.checked).toBeTruthy();
    expect(secondInput.checked).toBeFalsy();
  });

  it("should be hidden with autoHideContainer", () => {
    const fixture = render({ items: [] });
    fixture.componentInstance.autoHideContainer = true;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
