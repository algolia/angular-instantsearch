import { createSSRSearchClient } from '../create-ssr-search-client';
import algoliasearch from 'algoliasearch';
import { VERSION } from '../version';
import { VERSION as AngularVersion } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

describe('createSSRSearchClient (v4)', () => {
  it('passes user agents', () => {
    const ssrSearchClient = createSSRSearchClient({
      appId: 'test',
      apiKey: 'test',
      httpClient: null,
      HttpHeaders: null,
      makeStateKey: null,
      transferState: null,
    });

    expect(ssrSearchClient.transporter.userAgent.value).toBe(
      `Algolia for JavaScript (${algoliasearch.version}); Node.js (${
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

    expect(
      ssrSearchClient.transporter.headers['x-algolia-application-id']
    ).toBe('appId');
    expect(ssrSearchClient.transporter.headers['x-algolia-api-key']).toBe(
      'apiKey'
    );
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

    expect(ssrSearchClient.transporter.hosts).toEqual([]);
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
