import { createSSRSearchClient } from '../create-ssr-algolia-client';
import * as algoliasearchProxy from 'algoliasearch/index';
import { VERSION } from '../version';
import { VERSION as AngularVersion } from '@angular/core';

jest.mock('algoliasearch/index');

describe('Create SSR', () => {
  it('forwards the default options to the search client', () => {
    const addAlgoliaAgent = jest.fn();
    algoliasearchProxy.mockImplementation(() => {
      return {
        addAlgoliaAgent,
      };
    });
  
    createSSRSearchClient({
      appId: 'appId',
      apiKey: 'apiKey',
      httpClient: null,
      HttpHeaders: null,
      makeStateKey: null,
      transferState: null,
    });
  
    expect(algoliasearchProxy).toHaveBeenCalledWith('appId', 'apiKey', {});
  });
  
  it('forwards the options to the search client', () => {
    const addAlgoliaAgent = jest.fn();
    algoliasearchProxy.mockImplementation(() => {
      return {
        addAlgoliaAgent,
      };
    });
  
    createSSRSearchClient({
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
  
    expect(algoliasearchProxy).toHaveBeenCalledWith('appId', 'apiKey', {
      queryParameters: {},
    });
  });
});
