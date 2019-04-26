import 'jest-preset-angular';

// stupid workaround for TS
import * as helper from 'algoliasearch-helper';
require('algoliasearch-helper').default = helper;

const mock = () => {
  let storage = {};
  return {
    getItem(key) {
      return storage[key] || null;
    },
    setItem(key, value) {
      storage[key] = value;
    },
    removeItem(key) {
      delete storage[key];
    },
    clear() {
      storage = {};
    },
  };
};

Object.defineProperty(window, 'localStorage', { value: mock() });
Object.defineProperty(window, 'sessionStorage', { value: mock() });
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ['-webkit-appearance'],
});
