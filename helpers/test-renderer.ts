import { Component, ViewChild } from "@angular/core";
import { TestBed } from "@angular/core/testing";

import { NgAisInstantSearchModule } from "../src/instantsearch/instantsearch.module";

// mock component, dont create a real instantearch instance
jest.mock("../src/base-widget");
jest.mock("../src/instantsearch/instantsearch");

export function createRenderer({
  template,
  TestedWidget,
  defaultState
}: {
  template: string;
  TestedWidget: any;
  defaultState?: {};
}) {
  return function(state?: {}) {
    return render({
      template,
      TestedWidget,
      state: state ? { ...(defaultState || {}), ...state } : undefined
    });
  };
}

function render({
  template,
  TestedWidget,
  state
}: {
  template: string;
  TestedWidget: any;
  state?: {};
}) {
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
    declarations: [TestContainer, TestedWidget],
    imports: [NgAisInstantSearchModule.forRoot()]
  });

  const fixture = TestBed.createComponent(TestContainer);
  fixture.detectChanges();

  if (state) {
    fixture.componentInstance.testedWidget.updateState(state, false);
    fixture.detectChanges();
  }

  return fixture;
}
