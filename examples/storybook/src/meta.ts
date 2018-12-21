import { moduleMetadata } from '@storybook/angular';

import { NgAisModule } from 'angular-instantsearch';

const meta = moduleMetadata({
  imports: [NgAisModule.forRoot()],
});

export default meta;
