import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { wrapWithHits } from '../wrap-with-hits';
import meta from '../meta';

storiesOf('Hits', module)
  .addDecorator(meta)
  .add('default', () => ({
    component: wrapWithHits({
      template: '<ais-hits></ais-hits>',
    }),
  }))
  .add('customized hits', () => ({
    component: wrapWithHits({
      template: `
      <ais-hits>
        <ng-template let-hits="hits">
          <div *ngFor="let hit of hits">
            Hit {{hit.objectID}}:
            <ais-highlight attribute="name" [hit]="hit">
            </ais-highlight>
          </div>
        </ng-template>
      </ais-hits>
      `,
    }),
  }))
  .add('with transformItems', () => ({
    component: wrapWithHits({
      template: `
      <ais-hits [transformItems]="transformItems"> 
        <ng-template let-hits="hits">
          <div *ngFor="let hit of hits">
            Hit {{hit.name}}
          </div>
        </ng-template>
      </ais-hits>
      `,
      methods: {
        transformItems: items =>
          items.map(item => ({ ...item, name: `${item.name} (transformed)` })),
      },
    }),
  }))
  .add('with insights', () => ({
    component: wrapWithHits({
      template: `
      <ais-hits>
        <ng-template let-hits="hits" let-insights="insights">
          <div *ngFor="let hit of hits">
            Hit {{hit.objectID}}:
            <ais-highlight attribute="name" [hit]="hit">
            </ais-highlight>
            
            <button (click)="insights('clickedObjectIDsAfterSearch', { eventName: 'Add to cart', objectIDs: [hit.objectID] })">
              Add to favorite
            </button>
          </div>
        </ng-template>
      </ais-hits>
      `,
      insightsClient: (method: string, payload: any) => {
        action(`[InsightsClient] sent ${method} with payload`)(payload);
      },
      searchParameters: {
        clickAnalytics: true,
      },
    }),
  }));
