import { storiesOf } from '@storybook/angular';
import { wrapWithHits } from '../wrap-with-hits';
import meta from '../meta';

storiesOf('HierarchicalMenu', module)
  .addDecorator(meta)
  .add('default', () => ({
    component: wrapWithHits({
      template: `
    <ais-hierarchical-menu
      [attributes]="[
        'hierarchicalCategories.lvl0',
        'hierarchicalCategories.lvl1',
        'hierarchicalCategories.lvl2'
      ]"
    >
    </ais-hierarchical-menu>
  `,
    }),
  }))
  .add('hide parent level', () => ({
    component: wrapWithHits({
      template: `
        <ais-hierarchical-menu
          [showParentLevel]="false"
          [attributes]="[
            'hierarchicalCategories.lvl0',
            'hierarchicalCategories.lvl1',
            'hierarchicalCategories.lvl2'
          ]"
        >
        </ais-hierarchical-menu>
      `,
    }),
  }))
  .add('with default selected item', () => ({
    component: wrapWithHits({
      template: `
        <ais-hierarchical-menu
          [attributes]="[
            'hierarchicalCategories.lvl0',
            'hierarchicalCategories.lvl1',
            'hierarchicalCategories.lvl2'
          ]"
        >
        </ais-hierarchical-menu>
      `,
      searchParameters: {
        hierarchicalFacetsRefinements: {
          'hierarchicalCategories.lvl0': [
            'Cameras & Camcorders > Digital Cameras',
          ],
        },
      },
    }),
  }));
