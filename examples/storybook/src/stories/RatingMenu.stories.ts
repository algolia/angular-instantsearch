import { storiesOf } from '@storybook/angular';
import { wrapWithHits } from '../wrap-with-hits';
import meta from '../meta';

storiesOf('RatingMenu', module)
  .addDecorator(meta)
  .add('default with panel header', () => ({
    component: wrapWithHits({
      template: `
      <ais-panel header="Rating">
        <ais-rating-menu
          attribute="rating"
          [max]="5"
        >
        </ais-rating-menu>
      </ais-panel>
    `,
      indexName: 'instant_search_rating_asc',
    }),
  }));
