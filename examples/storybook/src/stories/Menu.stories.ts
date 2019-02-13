import { storiesOf } from '@storybook/angular';
import { wrapWithHits } from '../wrap-with-hits';
import meta from '../meta';

storiesOf('Menu', module)
  .addDecorator(meta)
  .add('default', () => ({
    component: wrapWithHits({
      template: '<ais-menu attribute="categories"></ais-menu>',
    }),
  }))
  .add('with showMore and panel header', () => ({
    component: wrapWithHits({
      template: `
        <ais-panel header="Categories">
          <ais-menu
            attribute="categories"
            [limit]="3"
            [showMore]="true"
            [showMoreLimit]="10"
            
          >
          </ais-menu>
        </ais-panel>
      `,
    }),
  }));
