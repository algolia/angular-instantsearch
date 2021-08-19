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
jest.mock('../../../src/typed-base-widget');
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

  it('should include only imported components in build', async () => {
    const bundle = await readFileGlob(
      join(__dirname, './test-app/dist/main-es2015.*.js')
    );

    expect(bundle).toContain('ais.searchBox');
    expect(bundle).toContain('ais.breadcrumb');
    expect(bundle).toContain('ais.refinementList');

    // FIXME: it seems hits, infiniteHits and index are never tree shaked
    // expect(bundle).not.toContain('ais.hits');
    // expect(bundle).not.toContain('ais.infiniteHits');
    // expect(bundle).not.toContain('ais.index');

    expect(bundle).not.toContain('ais.clearRefinements');
    expect(bundle).not.toContain('ais.configure');
    expect(bundle).not.toContain('ais.currentRefinements');
    expect(bundle).not.toContain('ais.hierarchicalMenu');
    expect(bundle).not.toContain('ais.hitsPerPage');
    expect(bundle).not.toContain('ais.menu');
    expect(bundle).not.toContain('ais.numericMenu');
    expect(bundle).not.toContain('ais.pagination');
    expect(bundle).not.toContain('ais.panel');
    expect(bundle).not.toContain('ais.rangeInput');
    expect(bundle).not.toContain('ais.rangeSlider');
    expect(bundle).not.toContain('ais.ratingMenu');
    expect(bundle).not.toContain('ais.sortBy');
    expect(bundle).not.toContain('ais.toggle');
  });
});
