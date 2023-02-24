import { Component, Inject, Optional } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { createSSRSearchClient } from 'angular-instantsearch';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { simple } from 'instantsearch.js/es/lib/stateMappings';
import { history } from 'instantsearch.js/es/lib/routers';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'server-side-rendering';
  config: any;

  constructor(
    private httpClient: HttpClient,
    private transferState: TransferState,
    @Optional()
    @Inject(REQUEST)
    protected request: Request
  ) {
    this.config = {
      searchClient: createSSRSearchClient({
        makeStateKey,
        HttpHeaders,
        appId: 'latency',
        apiKey: '6be0576ff61c053d5f9a3225e2a90f76',
        transferState: this.transferState,
        httpClient: this.httpClient,
      }),
      indexName: 'instant_search',
      routing: {
        router: history({
          getLocation: () => {
            if (this.request) {
              const req = this.request;
              const protocol =
                (req.headers.referer && req.headers.referer.split('://')[0]) ||
                'https';
              const url = `${protocol}://${req.headers.host}${req.url}`;
              return (new URL(url) as unknown) as Location;
            }
            return window.location;
          },
        }),
        stateMapping: simple(),
      },
    };
  }
}
