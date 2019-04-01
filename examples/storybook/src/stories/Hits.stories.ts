import { storiesOf } from '@storybook/angular';
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
  }));
