import { storiesOf } from '@storybook/angular';
import { wrapWithHits } from '../wrap-with-hits';
import meta from '../meta';

storiesOf('Index', module)
  .addDecorator(meta)
  .add('hits of separate index', () => ({
    component: wrapWithHits({
      template: `
        <ais-index indexName="airbnb">
          <ais-stats></ais-stats>
          <ais-hits>
            <ng-template let-hits="hits">
              <div *ngFor="let hit of hits">
                Hit {{hit.objectID}}:
                <ais-highlight attribute="name" [hit]="hit">
                </ais-highlight>
              </div>
            </ng-template>
          </ais-hits>
        </ais-index>
      `,
    }),
  }))
  .add('nested indices', () => ({
    component: wrapWithHits({
      template: `
        <ais-configure [searchParameters]="{ hitsPerPage: 2 }"></ais-configure>
        <ais-index indexName="airbnb">
          <ais-stats></ais-stats>
          <div style="border: 1px solid">
            <ais-hits>
              <ng-template let-hits="hits">
                <div *ngFor="let hit of hits">
                  Hit {{hit.objectID}}:
                  <ais-highlight attribute="name" [hit]="hit">
                  </ais-highlight>
                </div>
              </ng-template>
            </ais-hits>
          </div>
          <ais-index indexName="instant_search_rating_asc">
            <div style="border: 1px solid">
              <ais-hits>
                <ng-template let-hits="hits">
                  <div *ngFor="let hit of hits">
                    Hit {{hit.objectID}}:
                    <ais-highlight attribute="name" [hit]="hit">
                    </ais-highlight>
                  </div>
                </ng-template>
              </ais-hits>
            </div>
          </ais-index>
        </ais-index>
      `,
    }),
  }));
