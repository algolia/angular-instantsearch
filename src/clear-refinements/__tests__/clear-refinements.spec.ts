import { TestBed } from "@angular/core/testing";

import { NgAisInstantSearchModule } from "../../instantsearch/instantsearch.module";
import { NgAisClearRefinementsModule } from "../clear-refinements.module";
import { NgAisClearRefinements } from "../clear-refinements";

jest.mock("../../base-widget");

describe("ClearRefinements", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [],
      imports: [NgAisInstantSearchModule.forRoot(), NgAisClearRefinementsModule]
    })
  );

  it("renders markup without state", () => {
    const fixture = TestBed.createComponent(NgAisClearRefinements);
    expect(fixture).toMatchSnapshot();
  });

  it("should render disabled button when no refinements", () => {
    const fixture = TestBed.createComponent(NgAisClearRefinements);
    fixture.detectChanges();

    const btn = fixture.debugElement.nativeElement.querySelector("button");
    expect(btn.disabled).toBeTruthy();
  });

  it("should render enabled button when refinements", () => {
    const fixture = TestBed.createComponent(NgAisClearRefinements);

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
    const fixture = TestBed.createComponent(NgAisClearRefinements);

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

  it("should be hidden with `autoHideContainer`", () => {
    const fixture = TestBed.createComponent(NgAisClearRefinements);
    fixture.componentInstance.autoHideContainer = true;
    fixture.componentInstance.updateState({ hasRefinements: false }, false);
    fixture.detectChanges();
  });
});
