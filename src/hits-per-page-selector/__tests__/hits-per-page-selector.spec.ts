import { TestBed } from "@angular/core/testing";

import { NgAisInstantSearchModule } from "../../instantsearch/instantsearch.module";
import { NgAisHitsPerPageSelectorModule } from "../hits-per-page-selector.module";
import { NgAisHitsPerPageSelector } from "../hits-per-page-selector";

jest.mock("../../base-widget");

describe("HitsPerPageSelector", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        NgAisInstantSearchModule.forRoot(),
        NgAisHitsPerPageSelectorModule
      ]
    })
  );

  it("renders markup without state", () => {
    const fixture = TestBed.createComponent(NgAisHitsPerPageSelector);
    expect(fixture).toMatchSnapshot();
  });

  it("renders markup with state", () => {
    const fixture = TestBed.createComponent(NgAisHitsPerPageSelector);

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
    const fixture = TestBed.createComponent(NgAisHitsPerPageSelector);

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
});
