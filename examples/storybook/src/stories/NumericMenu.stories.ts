import { storiesOf } from '@storybook/angular';
import { wrapWithHits } from '../wrap-with-hits';
import meta from '../meta';

storiesOf('NumericMenu', module)
  .addDecorator(meta)
  .add('default with panel header', () => ({
    component: wrapWithHits({
      template: `
      <ais-panel header="Numeric menu (price)">
        <ais-numeric-menu
          attribute="price"
          operator="or"
          [items]="[
            { name: 'All' },
            { end: 4, name: 'less than 4' },
            { start: 4, end: 4, name: '4' },
            { start: 5, end: 10, name: 'between 5 and 10' },
            { start: 10, name: 'more than 10' }
          ]"
        >
        </ais-numeric-menu>
      </ais-panel>
    `,
    }),
  }));
