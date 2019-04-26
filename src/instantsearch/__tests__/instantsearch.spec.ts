import { NgAisInstantSearchModule } from '../instantsearch.module';
import { Component, VERSION as AngularVersion } from '@angular/core';
import { VERSION } from '../../version';
import { TestBed } from '@angular/core/testing';

jest.mock('instantsearch.js/es', () => ({
  default: () => {
    return {
      on: jest.fn(),
      start: jest.fn(),
      removeListener: jest.fn(),
      dispose: jest.fn(),
    };
  },
}));

jest.mock('../../../src/base-widget');

describe('InstantSearch', () => {
  it('should add user agent when the client is provided to the config', () => {
    const searchClient = {
      addAlgoliaAgent: jest.fn(),
      search: jest.fn(),
    };

    @Component({
      template: `<ais-instantsearch [config]="config"> </ais-instantsearch>`,
    })
    class TestContainer {
      public config = {
        indexName: 'theIndexName',
        searchClient,
      };
    }

    TestBed.configureCompiler({ preserveWhitespaces: true } as any)
      .configureTestingModule({
        imports: [NgAisInstantSearchModule.forRoot()],
        declarations: [TestContainer],
      })
      .compileComponents();

    const fixture = TestBed.createComponent(TestContainer);
    fixture.detectChanges();

    expect(searchClient.addAlgoliaAgent).toHaveBeenCalledTimes(2);
    expect(searchClient.addAlgoliaAgent).toHaveBeenCalledWith(
      `angular (${AngularVersion.full})`
    );
    expect(searchClient.addAlgoliaAgent).toHaveBeenCalledWith(
      `angular-instantsearch (${VERSION})`
    );
  });

  it('should not add a user agent when addAlgoliaAgent is not provided in the client', () => {
    const searchClient = {
      addAlgoliaAgent: jest.fn(),
      search: jest.fn(),
    };

    @Component({
      template: `<ais-instantsearch [config]="config"> </ais-instantsearch>`,
    })
    class TestContainer {
      public config = {
        indexName: 'theIndexName',
        searchClient,
      };
    }

    TestBed.configureCompiler({ preserveWhitespaces: true } as any)
      .configureTestingModule({
        imports: [NgAisInstantSearchModule.forRoot()],
        declarations: [TestContainer],
      })
      .compileComponents();

    expect(() => {
      const fixture = TestBed.createComponent(TestContainer);
      fixture.detectChanges();
    }).not.toThrowError();
  });
});
