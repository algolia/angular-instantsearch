import { moduleMetadata } from '@storybook/angular';

import { NgAisModule } from 'angular-instantsearch';
import '!style-loader!css-loader!./styles.css';

const meta = moduleMetadata({
  imports: [NgAisModule.forRoot()],
});

export default meta;
