import { storiesOf } from '@storybook/angular';
import { wrapWithHits } from '../wrap-with-hits';
import meta from '../meta';

storiesOf('Breadcrumb', module)
  .addDecorator(meta)
  .add('default', () => ({
    component: wrapWithHits({
      template: ` <ais-breadcrumb [attributes]="[ 'hierarchicalCategories.lvl0', 'hierarchicalCategories.lvl1', 'hierarchicalCategories.lvl2' ]" > </ais-breadcrumb> `,
      searchParameters: {
        hierarchicalFacetsRefinements: {
          'hierarchicalCategories.lvl0': [
            'Cameras & Camcorders > Digital Cameras',
          ],
        },
      },
      filters: ` <ais-hierarchical-menu [attributes]="[ 'hierarchicalCategories.lvl0', 'hierarchicalCategories.lvl1', 'hierarchicalCategories.lvl2' ]"> </ais-hierarchical-menu> `,
    }),
  }));
