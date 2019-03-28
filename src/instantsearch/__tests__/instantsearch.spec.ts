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
    const addAlgoliaAgent = jest.fn();
    @Component({
      template: `<ais-instantsearch [config]="config"> </ais-instantsearch>`,
    })
    class TestContainer {
      public config = {
        appId: 'theAppId',
        apiKey: 'theApiKey',
        indexName: 'theIndexName',
        searchClient: { addAlgoliaAgent },
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

    expect(addAlgoliaAgent).toHaveBeenCalledTimes(2);
    expect(addAlgoliaAgent).toHaveBeenCalledWith(
      `angular (${AngularVersion.full})`
    );
    expect(addAlgoliaAgent).toHaveBeenCalledWith(
      `angular-instantsearch (${VERSION})`
    );
  });

  it('should not add a user agent when the client is not provided to the config', () => {
    @Component({
      template: `<ais-instantsearch [config]="config"> </ais-instantsearch>`,
    })
    class TestContainer {
      public config = {
        appId: 'theAppId',
        apiKey: 'theApiKey',
        indexName: 'theIndexName',
        searchClient: {},
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
