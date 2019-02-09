import { storiesOf } from '@storybook/angular';
import { wrapWithHits } from '../wrap-with-hits';
import meta from '../meta';

storiesOf('CurrentRefinements', module)
  .addDecorator(meta)
  .add('default', () => ({
    component: wrapWithHits({
      template: '<ais-current-refinements></ais-current-refinements>',
      searchParameters: {
        disjunctiveFacetsRefinements: { brand: ['Apple', 'Samsung'] },
        disjunctiveFacets: ['brand'],
        numericRefinements: { price: { '>=': [100] } },
      },
    }),
  }))
  .add('with panel header', () => ({
    component: wrapWithHits({
      template: `
        <ais-panel header='Current refinements'>
          <ais-current-refinements></ais-current-refinements>
        </ais-panel>
      `,
      searchParameters: {
        disjunctiveFacetsRefinements: { brand: ['Apple', 'Samsung'] },
        disjunctiveFacets: ['brand'],
        numericRefinements: { price: { '>=': [100] } },
      },
    }),
  }))
  .add('with panel header but no refinements', () => ({
    component: wrapWithHits({
      template: `
        <ais-panel header='Current refinements'>
          <ais-current-refinements>
          </ais-current-refinements>
        </ais-panel>
      `,
    }),
  }))
  .add("with [includedAttributes]=\"['query', 'brand']", () => ({
    component: wrapWithHits({
      template: `
        <ais-panel header='Current refinements'>
          <ais-current-refinements [includedAttributes]="['query', 'brand']">
          </ais-current-refinements>
        </ais-panel>
      `,
      searchParameters: {
        disjunctiveFacetsRefinements: { brand: ['Apple', 'Samsung'] },
        disjunctiveFacets: ['brand'],
        numericRefinements: { price: { '>=': [100] } },
      },
    }),
  }));
