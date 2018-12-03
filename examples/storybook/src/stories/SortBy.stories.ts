import { storiesOf } from '@storybook/angular';
import { wrapWithHits } from '../wrap-with-hits';
import meta from '../meta';

storiesOf('SortBy', module)
  .addDecorator(meta)
  .add('default', () => ({
    component: wrapWithHits({
      template: `
      <ais-sort-by
        [items]="[
          { name: 'instant_search', label: 'Most relevant' },
          { name: 'instant_search_price_asc', label: 'Lowest price' },
          { name: 'instant_search_price_desc', label: 'Highest price' }
        ]"
      >
      </ais-sort-by>
    `,
    }),
  }));
