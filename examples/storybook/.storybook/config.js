import { configure } from '@storybook/angular';

const req = require.context('../src/stories/', true, /\.stories\.ts$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

import './styles.css';

configure(loadStories, module);
