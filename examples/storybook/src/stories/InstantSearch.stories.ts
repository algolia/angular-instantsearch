import { storiesOf } from '@storybook/angular';
import algoliasearch from 'algoliasearch/lite';
import { wrapWithHits } from '../wrap-with-hits';
import meta from '../meta';

storiesOf('InstantSearchJS', module)
  .addDecorator(meta)
  .add('with algoliasearch search client', () => ({
    component: wrapWithHits({
      template: '',
      searchClient: algoliasearch(
        'latency',
        '6be0576ff61c053d5f9a3225e2a90f76'
      ),
    }),
  }));
