import { storiesOf } from '@storybook/angular';
import { wrapWithHits } from '../wrap-with-hits';
import meta from '../meta';

storiesOf('HitsPerPage', module)
  .addDecorator(meta)
  .add('default', () => ({
    component: wrapWithHits({
      template: `
      <ais-hits-per-page
        [items]="[
          { value: 3, label: '3 per page' },
          { value: 5, label: '5 per page' },
          { value: 10, label: '10 per page' }
        ]"
      >
      </ais-hits-per-page>
    `,
    }),
  }))
  .add('with default to 5', () => ({
    component: wrapWithHits({
      template: `
        <ais-hits-per-page
          [items]="[
            { value: 3, label: '3 per page' },
            { value: 5, label: '5 per page', default: true },
            { value: 10, label: '10 per page' }
          ]"
        >
        </ais-hits-per-page>
      `,
    }),
  }));
