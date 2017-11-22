import { TestBed } from "@angular/core/testing";

import { NgAisInstantSearchModule } from "../../instantsearch/instantsearch.module";
import { NgAisNumericRangeModule } from "../numeric-range.module";
import { NgAisNumericRange } from "../numeric-range";

jest.mock("../../base-widget");

const defaultState = {
  range: { min: 0, max: 100 },
  start: [0, 100],
  refine: jest.fn()
};

const render = (state?: {}) => {
  const fixture = TestBed.createComponent(NgAisNumericRange);

  if (state) {
    fixture.componentInstance.updateState({ ...defaultState, ...state });
  }

  fixture.detectChanges();
  return fixture;
};

describe("NumericRange", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [NgAisInstantSearchModule.forRoot(), NgAisNumericRangeModule]
    });
  });

  it("renders markup without state", () => {
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it("renders markup with state", () => {
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });

  it("should update `min/max InputValue`", () => {
    const fixture = render({});

    const [
      minInput,
      maxInput
    ] = fixture.debugElement.nativeElement.querySelectorAll("input");

    minInput.value = "20";
    minInput.dispatchEvent(new Event("change"));

    maxInput.value = "50";
    maxInput.dispatchEvent(new Event("change"));

    expect(fixture.componentInstance.minInputValue).toBe(20);
    expect(fixture.componentInstance.maxInputValue).toBe(50);
  });

  it("should call renfine when submitting form", () => {
    const refine = jest.fn();
    const fixture = render({ refine });

    const [
      minInput,
      maxInput
    ] = fixture.debugElement.nativeElement.querySelectorAll("input");

    minInput.value = "20";
    minInput.dispatchEvent(new Event("change"));

    maxInput.value = "50";
    maxInput.dispatchEvent(new Event("change"));

    expect(fixture.componentInstance.minInputValue).toBe(20);
    expect(fixture.componentInstance.maxInputValue).toBe(50);

    const submitBtn = fixture.debugElement.nativeElement.querySelector(
      "button"
    );
    submitBtn.click();

    expect(refine).toHaveBeenCalled();
    expect(refine).toHaveBeenCalledWith([20, 50]);
  });
});
