import * as algoliasearchProxy from 'algoliasearch';
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

const algoliasearch = algoliasearchProxy.default || algoliasearchProxy;
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
  const searchClient = algoliasearch(appId, apiKey, options);

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
