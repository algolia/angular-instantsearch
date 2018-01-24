import { TestBed } from "@angular/core/testing";

import { NgAisInstantSearchModule } from "../../instantsearch/instantsearch.module";
import { NgAisHitsPerPageModule } from "../results-per-page.module";
import { NgAisHitsPerPage } from "../results-per-page";

jest.mock("../../base-widget");

describe("ResultsPerPage", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [],
      imports: [NgAisInstantSearchModule.forRoot(), NgAisHitsPerPageModule]
    })
  );

  it("renders markup without state", () => {
    const fixture = TestBed.createComponent(NgAisHitsPerPage);
    expect(fixture).toMatchSnapshot();
  });

  it("renders markup with state", () => {
    const fixture = TestBed.createComponent(NgAisHitsPerPage);

    fixture.componentInstance.updateState(
      {
        items: [
          { value: 10, label: "10 per page", isRefined: true },
          { value: 20, label: "20 per page" },
          { value: 30, label: "30 per page" }
        ],
        refine: jest.fn()
      },
      false
    );
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it("should refine() when selecting another option", () => {
    const refine = jest.fn();
    const fixture = TestBed.createComponent(NgAisHitsPerPage);

    fixture.componentInstance.updateState(
      {
        refine,
        items: [
          { value: 10, label: "10 per page", isRefined: true },
          { value: 20, label: "20 per page" },
          { value: 30, label: "30 per page" }
        ]
      },
      false
    );
    fixture.detectChanges();

    const select = fixture.debugElement.nativeElement.querySelector("select");
    select.value = "20";
    select.dispatchEvent(new Event("change"));

    expect(refine).toHaveBeenCalled();
    expect(refine).toHaveBeenCalledWith("20");
  });

  it("should be hidden with autoHideContainer", () => {
    const fixture = TestBed.createComponent(NgAisHitsPerPage);
    fixture.componentInstance.updateState({ items: [] }, false);
    fixture.componentInstance.autoHideContainer = true;

    expect(fixture).toMatchSnapshot();
  });
});
