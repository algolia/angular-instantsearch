import { storiesOf, moduleMetadata } from '@storybook/angular';
import { wrapWithHits } from '../wrap-with-hits';
import { MenuSelect, Refresh } from '../custom-widgets';
import meta from '../meta';

storiesOf('Custom widgets', module)
  .addDecorator(meta)
  .addDecorator(
    moduleMetadata({
      declarations: [MenuSelect, Refresh],
    })
  )
  .add('MenuSelect', () => ({
    component: wrapWithHits({
      template: `<ais-menu-select [attribute]="brand"></ais-menu-select>`,
    }),
  }))
  .add('Refresh', () => ({
    component: wrapWithHits({
      template: `<ais-refresh></ais-refresh>`,
    }),
  }));
