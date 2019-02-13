import { storiesOf } from '@storybook/angular';
import { wrapWithHits } from '../wrap-with-hits';
import meta from '../meta';

storiesOf('Toggle', module)
  .addDecorator(meta)
  .add('with single value', () => ({
    component: wrapWithHits({
      template: `
        <ais-toggle
          label="Free Shipping (toggle single value)"
          attribute="free_shipping"
        >
        </ais-toggle>
      `,
    }),
  }))
  .add('with on & off values', () => ({
    component: wrapWithHits({
      template: `
        <ais-toggle
          label="Canon (not checked) or Sony (checked)"
          attribute="brand"
          on="Sony"
          off="Canon"
        >
        </ais-toggle>
      `,
    }),
  }));
