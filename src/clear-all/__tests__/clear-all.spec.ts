import { TestBed } from "@angular/core/testing";

import { NgAisInstantSearchModule } from "../../instantsearch/instantsearch.module";
import { NgAisClearAllModule } from "../clear-all.module";
import { NgAisClearAll } from "../clear-all";

jest.mock("../../base-widget");

describe("ClearAll", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [],
      imports: [NgAisInstantSearchModule.forRoot(), NgAisClearAllModule]
    })
  );

  it("renders markup without state", () => {
    const fixture = TestBed.createComponent(NgAisClearAll);
    expect(fixture).toMatchSnapshot();
  });

  it("should render disabled button when no refinements", () => {
    const fixture = TestBed.createComponent(NgAisClearAll);
    fixture.detectChanges();

    const btn = fixture.debugElement.nativeElement.querySelector("button");
    expect(btn.disabled).toBeTruthy();
  });

  it("should render enabled button when refinements", () => {
    const fixture = TestBed.createComponent(NgAisClearAll);

    fixture.componentInstance.updateState(
      {
        hasRefinements: true,
        refine: jest.fn()
      },
      false
    );
    fixture.detectChanges();

    const btn = fixture.debugElement.nativeElement.querySelector("button");
    expect(btn.disabled).toBeFalsy();
  });

  it("should call refine() when clicked on button", () => {
    const spy = jest.fn();
    const fixture = TestBed.createComponent(NgAisClearAll);

    fixture.componentInstance.updateState(
      {
        hasRefinements: true,
        refine: spy
      },
      false
    );
    fixture.detectChanges();

    const btn = fixture.debugElement.nativeElement.querySelector("button");
    btn.click();

    expect(spy).toHaveBeenCalled();
  });
});
