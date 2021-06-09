import {
  NgAisModule,
  NgAisInstantSearchModule,
  NgAisToggleModule,
} from '../../index';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFile } from 'fs';
import { join } from 'path';
import glob from 'glob';

jest.mock('../../../src/base-widget');
jest.mock('../../../src/instantsearch/instantsearch');

function readFileGlob(globPath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    glob(globPath, null, (err, files) => {
      if (err) return reject(err);
      readFile(files[0], 'utf8', (err, content) => {
        if (err) return reject(err);
        resolve(content);
      });
    });
  });
}

function compile({ template, imports }) {
  @Component({
    template,
  })
  class TestContainer {}

  TestBed.configureCompiler({ preserveWhitespaces: true } as any)
    .configureTestingModule({
      imports,
      declarations: [TestContainer],
    })
    .compileComponents();
}

describe('tree-shaking 🎄', () => {
  it('should compile and run any component module even if not specifically imported', () => {
    expect(() =>
      compile({
        template: `
            <ais-instantsearch>
              <ais-breadcrumb></ais-breadcrumb>
              <ais-clear-refinements></ais-clear-refinements>
              <ais-configure></ais-configure>
              <ais-current-refinements></ais-current-refinements>
              <ais-hierarchical-menu></ais-hierarchical-menu>
              <ais-hits-per-page></ais-hits-per-page>
              <ais-infinite-hits></ais-infinite-hits>
              <ais-menu></ais-menu>
              <ais-numeric-menu></ais-numeric-menu>
              <ais-pagination></ais-pagination>
              <ais-panel></ais-panel>
              <ais-range-input></ais-range-input>
              <ais-range-slider></ais-range-slider>
              <ais-rating-menu></ais-rating-menu>
              <ais-refinement-list></ais-refinement-list>
              <ais-sort-by></ais-sort-by>
              <ais-toggle></ais-toggle>
            </ais-instantsearch>
          `,
        imports: [NgAisModule.forRoot()],
      })
    ).not.toThrowError();
  });

  it('should compile and run component modules when specifically imported', () => {
    expect(() =>
      compile({
        template: `
            <ais-instantsearch>
              <ais-toggle></ais-toggle>
            </ais-instantsearch>
          `,
        imports: [NgAisToggleModule, NgAisInstantSearchModule.forRoot()],
      })
    ).not.toThrowError();
  });

  it('should not allow compiling and running modules which have not been specifically imported', () => {
    expect(() =>
      compile({
        template: `
            <ais-instantsearch>
              <ais-toggle></ais-toggle>
              <ais-search-box></ais-search-box>
            </ais-instantsearch>
          `,
        imports: [NgAisToggleModule, NgAisInstantSearchModule.forRoot()],
      })
    ).toThrowError(/'ais-search-box' is not a known element/);
  });

  it('should include all components in heavy build', async () => {
    const bundle = await readFileGlob(
      join(__dirname, './test-app/dist_heavy/main-es2015.*.js')
    );
    expect(bundle).toContain('NgAisHits');
    expect(bundle).toContain('NgAisInstantSearch');
    expect(bundle).toContain('NgAisSearchBox');
    expect(bundle).toContain('NgAisHighlight'); // included by ais-hits

    expect(bundle).toContain('NgAisBreadcrumb');
    expect(bundle).toContain('NgAisClearRefinements');
    expect(bundle).toContain('NgAisConfigure');
    expect(bundle).toContain('NgAisCurrentRefinements');
    expect(bundle).toContain('NgAisHierarchicalMenu');
    expect(bundle).toContain('NgAisHitsPerPage');
    expect(bundle).toContain('NgAisInfiniteHits');
    expect(bundle).toContain('NgAisMenu');
    expect(bundle).toContain('NgAisNumericMenu');
    expect(bundle).toContain('NgAisPagination');
    expect(bundle).toContain('NgAisPanel');
    expect(bundle).toContain('NgAisRangeInput');
    expect(bundle).toContain('NgAisRangeSlider');
    expect(bundle).toContain('NgAisRatingMenu');
    expect(bundle).toContain('NgAisRefinementList');
    expect(bundle).toContain('NgAisSortBy');
    expect(bundle).toContain('NgAisToggle');
  });

  it('should include only imported components in light build', async () => {
    const bundle = await readFileGlob(
      join(__dirname, './test-app/dist_light/main-es2015.*.js')
    );

    expect(bundle).toContain('NgAisHits');
    expect(bundle).toContain('NgAisInstantSearch');
    expect(bundle).toContain('NgAisSearchBox');
    expect(bundle).toContain('NgAisHighlight'); // included by aishits

    expect(bundle).not.toContain('NgAisBreadcrumb');
    expect(bundle).not.toContain('NgAisClearRefinements');
    expect(bundle).not.toContain('NgAisConfigure');
    expect(bundle).not.toContain('NgAisCurrentRefinements');
    expect(bundle).not.toContain('NgAisHierarchicalMenu');
    expect(bundle).not.toContain('NgAisHitsPerPage');
    expect(bundle).not.toContain('NgAisInfiniteHits');
    expect(bundle).not.toContain('NgAisMenu');
    expect(bundle).not.toContain('NgAisNumericMenu');
    expect(bundle).not.toContain('NgAisPagination');
    expect(bundle).not.toContain('NgAisPanel');
    expect(bundle).not.toContain('NgAisRangeInput');
    expect(bundle).not.toContain('NgAisRangeSlider');
    expect(bundle).not.toContain('NgAisRatingMenu');
    expect(bundle).not.toContain('NgAisRefinementList');
    expect(bundle).not.toContain('NgAisSortBy');
    expect(bundle).not.toContain('NgAisToggle');
  });
});
