import { createSSRSearchClient } from '../create-ssr-search-client';
import * as algoliasearch from 'algoliasearch';
import { VERSION } from '../version';
import { VERSION as AngularVersion } from '@angular/core';

jest.mock('algoliasearch');

describe('createSSRSearchClient', () => {
  it('passes user agents', () => {
    const addAlgoliaAgent = jest.fn();

    algoliasearch.mockImplementation(() => {
      return {
        addAlgoliaAgent,
      };
    });

    const ssrSearchClient = createSSRSearchClient({
      appId: 'test',
      apiKey: 'test',
      httpClient: null,
      HttpHeaders: null,
      makeStateKey: null,
      transferState: null,
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

  it('forwards the default options to the search client', () => {
    const addAlgoliaAgent = jest.fn();
    algoliasearch.mockImplementation(() => {
      return {
        addAlgoliaAgent,
      };
    });

    const ssrSearchClient = createSSRSearchClient({
      appId: 'appId',
      apiKey: 'apiKey',
      httpClient: null,
      HttpHeaders: null,
      makeStateKey: null,
      transferState: null,
    });

    expect(algoliasearch).toHaveBeenCalledWith('appId', 'apiKey', {});
  });

  it('forwards the options to the search client', () => {
    const addAlgoliaAgent = jest.fn();
    algoliasearch.mockImplementation(() => {
      return {
        addAlgoliaAgent,
      };
    });

    const ssrSearchClient = createSSRSearchClient({
      appId: 'appId',
      apiKey: 'apiKey',
      options: {
        queryParameters: {},
      },
      httpClient: null,
      HttpHeaders: null,
      makeStateKey: null,
      transferState: null,
    });

    expect(algoliasearch).toHaveBeenCalledWith('appId', 'apiKey', {
      queryParameters: {},
    });
  });
});
