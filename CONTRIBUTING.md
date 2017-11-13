## Contributing

### Setup

You need latest LTS NodeJS (^8.6.0) use [nvm](https://github.com/creationix/nvm) and [yarn](https://github.com/yarnpkg/yarn) as package manager.

* `> git clone https://github.com/algolia/angular-instantsearch.git`
* `> npm i -g yarn`
* `> cd angular-instantsearch && yarn`

### Run

You can watch & reload library using `> yarn dev` and then open http://localhost:8080 to access a development web site which is using JIT (compiles app in the browser at runtime).

There is also an e-commerce example consuming the builded library and compliant to [AOT (compiles your app at build time)](https://angular.io/guide/aot-compiler) compiler. It must be run to test the library in production before any PRs.

You can use `> yarn examples:ecommerce` and open http://localhost:4200 to access the e-commerce example.

### Test

Tests are ran with [jest](https://facebook.github.io/jest/) and [jest-preset-angular](https://github.com/thymikee/jest-preset-angular).

* `> yarn test` -> run all tests
* `> yarn test:watch` -> run tests and watch for changes
