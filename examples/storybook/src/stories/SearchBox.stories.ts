import { storiesOf } from '@storybook/angular';
import { wrapWithHits } from '../wrap-with-hits';
import meta from '../meta';

storiesOf('SearchBox', module)
  .addDecorator(meta)
  .add('default', () => ({
    component: wrapWithHits({
      template:
        "<ais-search-box placeholder='Search for products'></ais-search-box>",
    }),
  }))
  .add('search on enter', () => ({
    component: wrapWithHits({
      template: `
        <ais-search-box
          [autofocus]="true"
          placeholder="Search for products"
          [searchAsYouType]="false"
        >
        </ais-search-box>
      `,
    }),
  }));
