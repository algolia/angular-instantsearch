import { TestBed } from "@angular/core/testing";

import { NgAisInstantSearchModule } from "../../instantsearch/instantsearch.module";
import { NgAisBreadcrumbModule } from "../breadcrumb.module";
import { NgAisBreadcrumb } from "../breadcrumb";

jest.mock("../../base-widget");

describe("Breadcrumb", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [],
      imports: [NgAisInstantSearchModule.forRoot(), NgAisBreadcrumbModule]
    })
  );

  it("renders markup without state", () => {
    const fixture = TestBed.createComponent(NgAisBreadcrumb);
    expect(fixture).toMatchSnapshot();
  });

  it("renders markup with two items", () => {
    const fixture = TestBed.createComponent(NgAisBreadcrumb);

    fixture.componentInstance.updateState(
      {
        createURL: jest.fn(),
        items: [{ name: "foo", value: "foo" }, { name: "bar", value: "bar" }],
        refine: jest.fn()
      },
      false
    );
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it("should refine when clicking on first item", () => {
    const fixture = TestBed.createComponent(NgAisBreadcrumb);
    const spy = jest.fn();
    fixture.componentInstance.updateState(
      {
        createURL: jest.fn(),
        items: [{ name: "foo", value: "foo" }, { name: "bar", value: "bar" }],
        refine: spy
      },
      false
    );
    fixture.detectChanges();

    const firstLink = fixture.debugElement.nativeElement.querySelector(
      "a:first-child"
    );

    firstLink.click();

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith("foo");
  });

  it("should display an header and a footer", () => {
    const fixture = TestBed.createComponent(NgAisBreadcrumb);
    fixture.componentInstance.header = "Header title";
    fixture.componentInstance.footer = "Footer title";
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
