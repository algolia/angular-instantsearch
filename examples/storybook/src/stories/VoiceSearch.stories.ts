import { storiesOf } from '@storybook/angular';
import { wrapWithHits } from '../wrap-with-hits';
import meta from '../meta';

storiesOf('VoiceSearch', module)
  .addDecorator(meta)
  .add('default', () => ({
    component: wrapWithHits({
      template: '<ais-voice-search></ais-voice-search>',
    }),
  }));
