import { Component, ViewChild } from "@angular/core";
import { TestBed } from "@angular/core/testing";

import { NgAisInstantSearchModule } from "../src/instantsearch/instantsearch.module";

// mock component, dont create a real instantearch instance
jest.mock("../src/base-widget");
jest.mock("../src/instantsearch/instantsearch");

export function createRenderer({
  template,
  TestedWidget,
  defaultState,
  additionalImports,
  additionalDeclarations
}: {
  template: string;
  TestedWidget: any;
  additionalImports?: any[];
  additionalDeclarations?: any[];
  defaultState?: {};
}) {
  return function(state?: {}, firstRender = false) {
    return render(
      {
        template,
        TestedWidget,
        additionalImports,
        additionalDeclarations,
        state: state ? { ...(defaultState || {}), ...state } : undefined
      },
      firstRender
    );
  };
}

function render(
  {
    template,
    TestedWidget,
    additionalImports,
    additionalDeclarations,
    state
  }: {
    template: string;
    TestedWidget: any;
    additionalImports?: any[];
    additionalDeclarations?: any[];
    state?: {};
  },
  firstRender = false
) {
  @Component({
    template: `
      <ng-ais-instantsearch>
        ${template}
      </ng-ais-instantsearch>
    `
  })
  class TestContainer {
    @ViewChild(TestedWidget) testedWidget;
  }

  TestBed.configureTestingModule({
    declarations: [
      TestContainer,
      TestedWidget,
      ...(additionalDeclarations || [])
    ],
    imports: [NgAisInstantSearchModule.forRoot(), ...(additionalImports || [])]
  });

  const fixture = TestBed.createComponent(TestContainer);
  fixture.detectChanges();

  if (state) {
    fixture.componentInstance.testedWidget.updateState(state, firstRender);
    fixture.detectChanges();
  }

  return fixture;
}
