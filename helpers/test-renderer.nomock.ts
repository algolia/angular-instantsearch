import { Component, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { NgAisInstantSearchModule } from '../src/instantsearch/instantsearch.module';

// same as test-renderer, but without mocking InstantSearch
// In the future, we want to migrate all tests to this

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
  return function(state?: {}, isFirstRender = false) {
    return render(
      {
        template,
        TestedWidget,
        additionalImports,
        additionalDeclarations,
        state: state ? { ...(defaultState || {}), ...state } : undefined,
        methods,
      },
      isFirstRender
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
  isFirstRender = false
) {
  @Component({
    template: `
      <ais-instantsearch [config]="config">
        ${template}
      </ais-instantsearch>
    `,
  })
  class TestContainer {
    config = {
      searchClient: {
        search(requests) {
          return Promise.resolve({
            results: requests.map(() => ({ hits: [] })),
          });
        },
      },
      indexName: 'instant_search',
    };
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
    fixture.componentInstance.testedWidget.updateState(state, isFirstRender);
    fixture.detectChanges();
  }

  return fixture;
}
