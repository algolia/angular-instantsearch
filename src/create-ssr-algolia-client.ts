import * as algoliasearchProxy from "algoliasearch/index";
import * as encodeProxy from "querystring-es3/encode";

import { VERSION } from "./version";

// AOT + Rollup workaround
// https://github.com/rollup/rollup/issues/1267#issuecomment-296395734

const algoliasearch = algoliasearchProxy.default || algoliasearchProxy;
const encode = encodeProxy.default || encodeProxy;

export function createSSRAlgoliaClient({
  httpClient,
  HttpHeaders,
  transferState,
  makeStateKey,
}) {
  console.warn(
    '`createSSRAlgoliaClient` is deprecated in favor of `createSSRSearchClient` to be plugged to `searchClient`.'
  );

  return (_, appId, apiKey) =>
    createSSRSearchClient({
      appId,
      apiKey,
      httpClient,
      HttpHeaders,
      transferState,
      makeStateKey,
    });
}

export function createSSRSearchClient({
  appId,
  apiKey,
  httpClient,
  HttpHeaders,
  transferState,
  makeStateKey
}) {
  const client = algoliasearch(appId, apiKey, {});
  client.addAlgoliaAgent(`angular-instantsearch ${VERSION}`);

  client._request = (rawUrl, opts) => {
    let headers = new HttpHeaders();

    headers = headers.set(
      "content-type",
      opts.method === "POST"
        ? "application/x-www-form-urlencoded"
        : "application/json"
    );

    headers = headers.set("accept", "application/json");

    const url =
      rawUrl + (rawUrl.includes("?") ? "&" : "?") + encode(opts.headers);

    const transferStateKey = makeStateKey(`ngais(${opts.body})`);

    if (transferState.hasKey(transferStateKey)) {
      const resp = JSON.parse(transferState.get(transferStateKey, {}));
      return Promise.resolve({
        statusCode: resp.status,
        body: resp.body,
        headers: resp.headers
      });
    }

    return new Promise((resolve, reject) => {
      httpClient
        .request(opts.method, url, {
          headers,
          body: opts.body,
          observe: "response"
        })
        .subscribe(
          resp => {
            transferState.set(transferStateKey, JSON.stringify(resp));
            resolve({
              statusCode: resp.status,
              body: resp.body,
              headers: resp.headers
            });
          },
          resp =>
            reject({
              statusCode: resp.status,
              body: resp.body,
              headers: resp.headers
            })
        );
    });
  };

  return client;
}
