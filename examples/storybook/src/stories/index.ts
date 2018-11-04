import { storiesOf, moduleMetadata } from '@storybook/angular';
import * as algoliasearch from 'algoliasearch/lite';

import { NgAisModule } from 'angular-instantsearch';
import '!style-loader!css-loader!../styles.css';

import { wrapWithHits } from '../wrap-with-hits';

const withSearchClient = wrapWithHits({
  template: '',
  searchClient: algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76'),
});
const stories = storiesOf('InstantSearchJS', module).addDecorator(
  moduleMetadata({
    imports: [NgAisModule.forRoot()],
    declarations: [withSearchClient],
    providers: [],
  })
);
stories.add('with algoliasearch search client', () => ({
  component: withSearchClient,
}));
