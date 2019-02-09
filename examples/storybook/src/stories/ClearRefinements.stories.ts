import { storiesOf } from '@storybook/angular';
import { wrapWithHits } from '../wrap-with-hits';
import meta from '../meta';

storiesOf('ClearRefinements', module)
  .addDecorator(meta)
  .add('default', () => ({
    component: wrapWithHits({
      template: '<ais-clear-refinements></ais-clear-refinements>',
      searchParameters: {
        disjunctiveFacetsRefinements: { brand: ['Apple'] },
        disjunctiveFacets: ['brand'],
      },
    }),
  }))
  .add('with nothing to clear', () => ({
    component: wrapWithHits({
      template: '<ais-clear-refinements></ais-clear-refinements>',
    }),
  }))
  .add('with clear refinements and query', () => ({
    component: wrapWithHits({
      template:
        "<ais-clear-refinements [includedAttributes]=\"['query', 'brand']\"></ais-clear-refinements>",
      searchParameters: {
        disjunctiveFacetsRefinements: { brand: ['Apple'] },
        disjunctiveFacets: ['brand'],
      },
    }),
  }));
