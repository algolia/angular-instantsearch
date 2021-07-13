import { createSSRSearchClient } from '../create-ssr-search-client';
import algoliasearch from 'algoliasearch-v3';
import { VERSION } from '../version';
import { VERSION as AngularVersion } from '@angular/core';
import { Observable } from 'rxjs';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

jest.mock('algoliasearch/lite', () => {
  return jest.requireActual('algoliasearch-v3');
});

describe('createSSRSearchClient (v3)', () => {
  it('passes user agents', () => {
    const ssrSearchClient = createSSRSearchClient({
      appId: 'test',
      apiKey: 'test',
      httpClient: null,
      HttpHeaders: null,
      makeStateKey: null,
      transferState: null,
    });

    expect((ssrSearchClient as any)._ua).toBe(
      `Algolia for JavaScript (${(algoliasearch as any).version}); Node.js (${
        process.versions.node
      }); angular (${
        AngularVersion.full
      }); angular-instantsearch (${VERSION}); angular-instantsearch-server (${VERSION})`
    );
  });

  it('forwards the default options to the search client', () => {
    const ssrSearchClient = createSSRSearchClient({
      appId: 'appId',
      apiKey: 'apiKey',
      httpClient: null,
      HttpHeaders: null,
      makeStateKey: null,
      transferState: null,
    });

    expect((ssrSearchClient as any).applicationID).toBe('appId');
    expect((ssrSearchClient as any).apiKey).toBe('apiKey');
  });

  it('forwards the options to the search client', () => {
    const ssrSearchClient = createSSRSearchClient({
      appId: 'appId',
      apiKey: 'apiKey',
      options: {
        hosts: [],
      },
      httpClient: null,
      HttpHeaders: null,
      makeStateKey: null,
      transferState: null,
    });

    expect((ssrSearchClient as any).hosts.read).toEqual([]);
    expect((ssrSearchClient as any).hosts.write).toEqual([]);
  });

  it('can do a request', async () => {
    const transferState = new TransferState();
    const httpClient = new HttpClient({
      handle() {
        return new Observable(observer => {
          observer.next(
            new HttpResponse({
              body: { testResponse: true },
              headers: new HttpHeaders(),
              status: 200,
            })
          );
        });
      },
    });
    const ssrSearchClient = createSSRSearchClient({
      appId: 'appId',
      apiKey: 'apiKey',
      httpClient,
      HttpHeaders,
      makeStateKey,
      transferState,
    });

    const res = await ssrSearchClient.search([]);

    expect(res).toEqual({ testResponse: true });
  });

  it('will cache a repeated request', async () => {
    const transferState = new TransferState();
    let counter = 0;
    const httpClient = new HttpClient({
      handle() {
        return new Observable(observer => {
          observer.next(
            new HttpResponse({
              // tslint:disable-next-line: no-increment-decrement
              body: { testResponse: counter++ },
              headers: new HttpHeaders(),
              status: 200,
            })
          );
        });
      },
    });
    const ssrSearchClient = createSSRSearchClient({
      appId: 'appId',
      apiKey: 'apiKey',
      httpClient,
      HttpHeaders,
      makeStateKey,
      transferState,
    });

    const res = await ssrSearchClient.search([]);

    expect(res).toEqual({ testResponse: 0 });

    const res2 = await ssrSearchClient.search([]);

    expect(res2).toEqual({ testResponse: 0 });
  });
});
