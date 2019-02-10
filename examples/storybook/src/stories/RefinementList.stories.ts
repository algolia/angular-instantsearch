import { storiesOf } from '@storybook/angular';
import { wrapWithHits } from '../wrap-with-hits';
import meta from '../meta';

storiesOf('RefinementList', module)
  .addDecorator(meta)
  .add('default with panel header', () => ({
    component: wrapWithHits({
      template: `
        <ais-panel header="Brand">
          <ais-refinement-list
            attribute="brand"
            operator="or"
            [limit]="10"
          >
          </ais-refinement-list>
        </ais-panel>
      `,
    }),
  }))
  .add('panel header with showMore', () => ({
    component: wrapWithHits({
      template: `
        <ais-panel header="Brand with show more">
          <ais-refinement-list
            attribute="brand"
            operator="or"
            [showMore]="true"
            [limit]="3"
            [showMoreLimit]="10"
          >
          </ais-refinement-list>
        </ais-panel>
      `,
    }),
  }))
  .add('panel header with search inside the items', () => ({
    component: wrapWithHits({
      template: `
        <ais-panel header="Searchable brands">
          <ais-refinement-list
            attribute="brand"
            operator="or"
            searchPlaceholder="Find other brands..."
            [searchable]="true"
            [limit]="10"
          >
          </ais-refinement-list>
        </ais-panel>
      `,
    }),
  }))
  .add('panel header with operator `and`', () => ({
    component: wrapWithHits({
      template: `
        <ais-panel header="Price ranges">
          <ais-refinement-list
            attribute="price_range"
            operator="and"
            [limit]="10"
            [transformItems]="transformItems"
          >
          </ais-refinement-list>
        </ais-panel>
      `,
      methods: {
        transformItems: items =>
          items.map(item => {
            item.highlighted = item.highlighted
              .replace(/(\d+) - (\d+)/, '$$$1 - $$$2')
              .replace(/> (\d+)/, '> $$$1');
            return item;
          }),
      },
    }),
  }));
