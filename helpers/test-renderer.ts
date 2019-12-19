import { Component, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { NgAisInstantSearchModule } from '../src/instantsearch/instantsearch.module';

// mock component, don't create a real instantsearch instance
jest.mock('../src/base-widget');
jest.mock('../src/instantsearch/instantsearch');

export function createRenderer({
  template,
  TestedWidget,
  defaultState,
  additionalImports,
  additionalDeclarations,
  methods = {},
}: {
  template: string;
  TestedWidget: any;
  additionalImports?: any[];
  additionalDeclarations?: any[];
  defaultState?: {};
  methods?: {};
}) {
  return function(state?: {}, firstRender = false) {
    return render(
      {
        template,
        TestedWidget,
        additionalImports,
        additionalDeclarations,
        state: state ? { ...(defaultState || {}), ...state } : undefined,
        methods,
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
    state,
    methods,
  }: {
    template: string;
    TestedWidget: any;
    additionalImports?: any[];
    additionalDeclarations?: any[];
    state?: {};
    methods?: {};
  },
  firstRender = false
) {
  @Component({
    template: `
      <ais-instantsearch>
        ${template}
      </ais-instantsearch>
    `,
  })
  class TestContainer {
    @ViewChild(TestedWidget) testedWidget;
    constructor() {
      Object.keys(methods).forEach(methodName => {
        this[methodName] = methods[methodName];
      });
    }
  }

  TestBed.configureCompiler({
    preserveWhitespaces: false,
  } as any).configureTestingModule({
    declarations: [
      TestContainer,
      TestedWidget,
      ...(additionalDeclarations || []),
    ],
    imports: [NgAisInstantSearchModule.forRoot(), ...(additionalImports || [])],
  });

  const fixture = TestBed.createComponent(TestContainer);
  fixture.detectChanges();

  if (state) {
    fixture.componentInstance.testedWidget.updateState(state, firstRender);
    fixture.detectChanges();
  }

  return fixture;
}
