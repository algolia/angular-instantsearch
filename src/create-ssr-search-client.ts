import * as algoliasearchProxy from 'algoliasearch/lite';
import * as encodeProxy from 'querystring-es3/encode';
import { VERSION as AngularVersion } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TransferState, StateKey } from '@angular/platform-browser';
import { VERSION } from './version';

type SSRSearchClientOptions = {
  appId: string;
  apiKey: string;
  httpClient: HttpClient;
  HttpHeaders: typeof HttpHeaders;
  transferState: TransferState;
  options?: object;
  makeStateKey<T = void>(key: string): StateKey<T>;
};

type RequestOptions = {
  // Algolia only uses GET and POST methods for searching.
  // See: https://www.algolia.com/doc/rest-api/search/#search-endpoints
  method: 'GET' | 'POST';
  headers: string;
  body: string;
};

// compatibility with different typescript settings:
// - esModuleInterop
// - allowSyntheticDefaultImports
const algoliasearch = (typeof algoliasearchProxy.default === 'function'
  ? algoliasearchProxy.default
  : algoliasearchProxy) as typeof algoliasearchProxy.default extends Function
  ? typeof algoliasearchProxy.default
  : typeof algoliasearchProxy;

const encode = encodeProxy.default || encodeProxy;

export function createSSRSearchClient({
  appId,
  apiKey,
  httpClient,
  HttpHeaders,
  transferState,
  makeStateKey,
  options = {},
}: SSRSearchClientOptions) {
  // A custom network request needs to be done, using TransferState of Angular.
  // This is done to make sure the request done backend for SSR doesn't get
  // made again frontend during hydration.
  // For compatibility with both v3 and v4 of algoliasearch, we are overriding the
  // network request function in two places:
  // v4: custom "requester"
  // v3: override "_request" on the prototype
  // since neither v3 uses the requester argument, and v4 use the _request, we
  // can safely do this without checking the version
  const searchClient = algoliasearch(appId, apiKey, {
    ...options,
    requester: {
      send({ headers, method, url, data }) {
        const transferStateKey = makeStateKey(`ngais(${data})`);

        if (transferState.hasKey(transferStateKey)) {
          const response = JSON.parse(
            transferState.get(transferStateKey, JSON.stringify({}))
          );

          return Promise.resolve({
            status: response.status,
            content: JSON.stringify(response.body),
            isTimedOut: false,
          });
        }

        return new Promise((resolve, reject) => {
          httpClient
            .request(method, url, {
              headers,
              body: data,
              observe: 'response',
            })
            .subscribe(
              response => {
                transferState.set(transferStateKey, JSON.stringify(response));

                resolve({
                  status: response.status,
                  content: JSON.stringify(response.body),
                  isTimedOut: false,
                });
              },
              response =>
                reject({
                  status: response.status,
                  body: response.body,
                })
            );
        });
      },
    },
  });

  searchClient.addAlgoliaAgent(`angular (${AngularVersion.full})`);
  searchClient.addAlgoliaAgent(`angular-instantsearch (${VERSION})`);
  searchClient.addAlgoliaAgent(`angular-instantsearch-server (${VERSION})`);

  (searchClient as any)._request = (
    rawUrl: string,
    options: RequestOptions
  ) => {
    let headers = new HttpHeaders();

    headers = headers.set(
      'content-type',
      options.method === 'POST'
        ? 'application/x-www-form-urlencoded'
        : 'application/json'
    );

    headers = headers.set('accept', 'application/json');

    const url =
      rawUrl + (rawUrl.includes('?') ? '&' : '?') + encode(options.headers);

    const transferStateKey = makeStateKey(`ngais(${options.body})`);

    if (transferState.hasKey(transferStateKey)) {
      const response = JSON.parse(
        transferState.get(transferStateKey, JSON.stringify({}))
      );

      return Promise.resolve({
        statusCode: response.status,
        body: response.body,
        headers: response.headers,
      });
    }

    return new Promise((resolve, reject) => {
      httpClient
        .request(options.method, url, {
          headers,
          body: options.body,
          observe: 'response',
        })
        .subscribe(
          response => {
            transferState.set(transferStateKey, JSON.stringify(response));

            resolve({
              statusCode: response.status,
              body: response.body,
              headers: response.headers,
            });
          },
          response =>
            reject({
              statusCode: response.status,
              body: response.body,
              headers: response.headers,
            })
        );
    });
  };

  return searchClient;
}
