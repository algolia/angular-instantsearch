import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { wrapWithHits } from '../wrap-with-hits';
import { MemoryRouter } from '../MemoryRouter';
import meta from '../meta';

storiesOf('InfiniteHits', module)
  .addDecorator(meta)
  .add('default', () => ({
    component: wrapWithHits({
      template: '<ais-infinite-hits></ais-infinite-hits>',
    }),
  }))
  .add('with custom template', () => ({
    component: wrapWithHits({
      template: `
        <ais-infinite-hits>
          <ng-template
            let-hits="hits"
            let-showMore="showMore"
            let-showPrevious="showPrevious"
            let-isFirstPage="isFirstPage"
            let-isLastPage="isLastPage"
          >
            <button (click)="showPrevious()" [disabled]="isFirstPage">Load previous</button>
            <div *ngFor="let hit of hits">
              <strong>{{hit.name}}</strong>
            </div>
            <button (click)="showMore()" [disabled]="isLastPage">Load more</button>
          </ng-template>
        </ais-infinite-hits>
      `,
    }),
  }))
  .add('with previous button enabled', () => ({
    component: wrapWithHits({
      template: '<ais-infinite-hits [showPrevious]=true></ais-infinite-hits>',
      routing: {
        router: new MemoryRouter({ page: 3 }),
      },
    }),
  }))
  .add('with insights', () => ({
    component: wrapWithHits({
      template: `
      <ais-infinite-hits>
        <ng-template let-hits="hits" let-showMore="showMore" let-insights="insights">
          <div *ngFor="let hit of hits">
            Hit {{hit.objectID}}:
            <ais-highlight attribute="name" [hit]="hit">
            </ais-highlight>
            
            <button (click)="insights('clickedObjectIDsAfterSearch', { eventName: 'Add to cart', objectIDs: [hit.objectID] })">
              Add to favorite
            </button>
          </div>
          <button (click)="showMore()">Load more</button>
        </ng-template>
      </ais-infinite-hits>
      `,
      insightsClient: (method: string, payload: any) => {
        action(`[InsightsClient] sent ${method} with payload`)(payload);
      },
      searchParameters: {
        clickAnalytics: true,
      },
    }),
  }));
