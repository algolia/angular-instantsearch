import { storiesOf } from '@storybook/angular';
import { wrapWithHits } from '../wrap-with-hits';
import meta from '../meta';

storiesOf('RangeInput', module)
  .addDecorator(meta)
  .add('default', () => ({
    component: wrapWithHits({
      template: `
      <ais-range-input attribute="price">
      </ais-range-input>
    `,
    }),
  }));
