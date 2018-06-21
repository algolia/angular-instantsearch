# Contributing

You can do code and documentation contributions.

## Code

### Setup

You need latest NodeJS (^10.5.0) use [nvm](https://github.com/creationix/nvm) and [yarn](https://yarnpkg.com/en/docs/install#alternatives-stablen) (^1.7.0) as package manager.

```sh
git clone https://github.com/algolia/angular-instantsearch.git
cd angular-instantsearch
```

### Run

You can watch & reload library using `> yarn dev` and then open http://localhost:3000 to access stories of Angular InstantSearch components rendered into [dev-novel](https://github.com/algolia/dev-novel).

There is also an e-commerce example consuming the builded library and compliant to [AOT (compiles your app at build time)](https://angular.io/guide/aot-compiler) compiler. It must be run to test the library in production before any PRs.

You can use `> yarn examples:ecommerce` and open http://localhost:4200 to access the e-commerce example.

### Test

Tests are ran with [jest](https://facebook.github.io/jest/) and [jest-preset-angular](https://github.com/thymikee/jest-preset-angular).

* `> yarn test` -> run all tests
* `> yarn test:watch` -> run tests and watch for changes
