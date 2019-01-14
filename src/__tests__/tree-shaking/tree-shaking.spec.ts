import {
  NgAisModule,
  NgAisInstantSearchModule,
  NgAisToggleModule,
} from '../../index';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';

jest.mock('../../../src/base-widget');
jest.mock('../../../src/instantsearch/instantsearch');

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
      path.join(__dirname, './test-app/dist_heavy/main.*.js')
    );

    expect(bundle).toContain('ais-hits');
    expect(bundle).toContain('ais-instantsearch');
    expect(bundle).toContain('ais-search-box');
    expect(bundle).toContain('ais-highlight');

    expect(bundle).toContain('ais-breadcrumb');
    expect(bundle).toContain('ais-clear-refinements');
    expect(bundle).toContain('ais-configure');
    expect(bundle).toContain('ais-current-refinements');
    expect(bundle).toContain('ais-hierarchical-menu');
    expect(bundle).toContain('ais-hits-per-page');
    expect(bundle).toContain('ais-infinite-hits');
    expect(bundle).toContain('ais-menu');
    expect(bundle).toContain('ais-numeric-menu');
    expect(bundle).toContain('ais-pagination');
    expect(bundle).toContain('ais-panel');
    expect(bundle).toContain('ais-range-input');
    expect(bundle).toContain('ais-range-slider');
    expect(bundle).toContain('ais-rating-menu');
    expect(bundle).toContain('ais-refinement-list');
    expect(bundle).toContain('ais-sort-by');
    expect(bundle).toContain('ais-toggle');
  });

  it('should include only imported components in light build', async () => {
    const bundle = await readFileGlob(
      path.join(__dirname, './test-app/dist_light/main.*.js')
    );

    expect(bundle).toContain('ais-hits');
    expect(bundle).toContain('ais-instantsearch');
    expect(bundle).toContain('ais-search-box');
    expect(bundle).toContain('ais-highlight'); // included by ais-hits

    expect(bundle).not.toContain('ais-breadcrumb');
    expect(bundle).not.toContain('ais-clear-refinements');
    expect(bundle).not.toContain('ais-configure');
    expect(bundle).not.toContain('ais-current-refinements');
    expect(bundle).not.toContain('ais-hierarchical-menu');
    expect(bundle).not.toContain('ais-hits-per-page');
    expect(bundle).not.toContain('ais-infinite-hits');
    expect(bundle).not.toContain('ais-menu');
    expect(bundle).not.toContain('ais-numeric-menu');
    expect(bundle).not.toContain('ais-pagination');
    expect(bundle).not.toContain('ais-panel');
    expect(bundle).not.toContain('ais-range-input');
    expect(bundle).not.toContain('ais-range-slider');
    expect(bundle).not.toContain('ais-rating-menu');
    expect(bundle).not.toContain('ais-refinement-list');
    expect(bundle).not.toContain('ais-sort-by');
    expect(bundle).not.toContain('ais-toggle');
  });

  function readFileGlob(globPath) {
    return new Promise((resolve, reject) => {
      glob(globPath, null, (err, files) => {
        if (err) return reject(err);
        fs.readFile(files[0], 'utf8', (err, content) => {
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
});
