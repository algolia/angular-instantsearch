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
  }))
  .add('with transformItems', () => {
    const transformItems = items => items.filter(item => item !== 'brand');

    return {
      component: wrapWithHits({
        template:
          "<ais-clear-refinements resetLabel='Clear all but `brand` refinement' [transformItems]='transformItems'></ais-clear-refinements>",
        filters: ` 
         <ais-panel header="Brand">
            <ais-refinement-list attribute="brand"> </ais-refinement-list> 
         </ais-panel>
         
         <ais-panel header="Category">
            <ais-hierarchical-menu [attributes]="[ 'hierarchicalCategories.lvl0', 'hierarchicalCategories.lvl1', 'hierarchicalCategories.lvl2' ]"> </ais-hierarchical-menu> 
         </ais-panel>
        `,
        methods: { transformItems },
      }),
    };
  });
