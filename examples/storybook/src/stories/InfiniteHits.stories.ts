import { storiesOf } from '@storybook/angular';
import { wrapWithHits } from '../wrap-with-hits';
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
          >
            <div *ngFor="let hit of hits">
              <strong>{{hit.name}}</strong>
            </div>
            <button (click)="showMore()">Load more</button>
          </ng-template>
        </ais-infinite-hits>
      `,
    }),
  }));
