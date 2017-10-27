import { TestBed } from "@angular/core/testing";

import { NgAisInstantSearchModule } from "../../instantsearch/instantsearch.module";
import { NgAisStatsModule } from "../stats.module";
import { NgAisStats } from "../stats";

import { bem } from "../../utils";

const cx = bem("Stats");

jest.mock("../../base-widget");

describe("Stats", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [],
      imports: [NgAisInstantSearchModule.forRoot(), NgAisStatsModule]
    })
  );

  it("should render without state", () => {
    const fixture = TestBed.createComponent(NgAisStats);
    expect(fixture).toMatchSnapshot();
  });

  it("should render with state", () => {
    const fixture = TestBed.createComponent(NgAisStats);
    fixture.componentInstance.updateState(
      {
        hitPerPage: 20,
        nbHits: 100,
        nbPages: 5,
        page: 0,
        processingTimeMS: 123,
        query: "foobar"
      },
      false
    );
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
