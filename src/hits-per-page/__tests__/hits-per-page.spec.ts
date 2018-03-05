import { createRenderer } from "../../../helpers/test-renderer";
import { NgAisHitsPerPage } from "../hits-per-page";

const render = createRenderer({
  defaultState: {
    items: [
      { value: 10, label: "10 per page", isRefined: true },
      { value: 20, label: "20 per page" },
      { value: 30, label: "30 per page" }
    ],
    refine: jest.fn()
  },
  template: "<ais-hits-per-page></ais-hits-per-page>",
  TestedWidget: NgAisHitsPerPage
});

describe("HitsPerPage", () => {
  it("renders markup without state", () => {
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it("renders markup with state", () => {
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });

  it("should refine() when selecting another option", () => {
    const refine = jest.fn();
    const fixture = render({ refine });

    const select = fixture.debugElement.nativeElement.querySelector("select");
    select.value = "20";
    select.dispatchEvent(new Event("change"));

    expect(refine).toHaveBeenCalled();
    expect(refine).toHaveBeenCalledWith("20");
  });

  it("should be hidden with autoHideContainer", () => {
    const fixture = render();

    fixture.componentInstance.testedWidget.autoHideContainer = true;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
