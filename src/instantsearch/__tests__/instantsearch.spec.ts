import { NgAisInstantSearchModule } from '../instantsearch.module';
import { Component, VERSION as AngularVersion } from '@angular/core';
import { VERSION } from '../../version';
import { TestBed } from '@angular/core/testing';
jest.mock('instantsearch.js/es', () => ({
  default: () => {
    return { on: jest.fn(), start: jest.fn() };
  },
}));

jest.mock('../../../src/base-widget');

describe('InstantSearch', () => {
  it('should add user agent stuff when the client is provided to the config', () => {
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
});
