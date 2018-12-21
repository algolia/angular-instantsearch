import { storiesOf } from '@storybook/angular';
import { wrapWithHits } from '../wrap-with-hits';
import meta from '../meta';

storiesOf('NumericSelector', module)
  .addDecorator(meta)
  .add('default', () => ({
    component: wrapWithHits({
      template: `
        <ais-numeric-selector
          attribute="popularity"
          operator=">="
          [items]="[
            { label: 'Default', value: 0 },
            { label: 'Top 10', value: 21459 },
            { label: 'Top 100', value: 21369 },
            { label: 'Top 500', value: 20969 }
          ]"
        >
        </ais-numeric-selector>
      `,
    }),
  }))
  .add('with default value', () => ({
    component: wrapWithHits({
      template: `
        <ais-numeric-selector
          attribute="rating"
          operator="="
          [items]="[
            { label: 'No rating selected', value: undefined },
            { label: 'Rating: 5', value: 5 },
            { label: 'Rating: 4', value: 4 },
            { label: 'Rating: 3', value: 3 },
            { label: 'Rating: 2', value: 2 },
            { label: 'Rating: 1', value: 1 }
          ]"
        >
        </ais-numeric-selector>
      `,
    }),
  }));
