import { createSSRSearchClient } from '../create-ssr-algolia-client';
import * as algoliasearchProxy from 'algoliasearch/index';
import { VERSION } from '../version';
import { VERSION as AngularVersion } from '@angular/core';

jest.mock('algoliasearch/index');

describe('Create SSR', () => {
  it('passes the User-Agent', () => {
    const addAlgoliaAgent = jest.fn();
    algoliasearchProxy.mockImplementation(() => {
      return {
        addAlgoliaAgent,
      };
    });

    const ssrClient = createSSRSearchClient({
      appId: 'test',
      apiKey: 'test',
      httpClient: null,
      HttpHeaders: null,
      makeStateKey: null,
      transferState: null,
      options: {},
    });
    expect(addAlgoliaAgent).toHaveBeenCalledTimes(3);
    expect(addAlgoliaAgent).toHaveBeenCalledWith(
      `angular (${AngularVersion.full})`
    );
    expect(addAlgoliaAgent).toHaveBeenCalledWith(
      `angular-instantsearch (${VERSION})`
    );
    expect(addAlgoliaAgent).toHaveBeenCalledWith(
      `angular-instantsearch-server (${VERSION})`
    );
  });
});
