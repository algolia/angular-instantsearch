# Contributing

You can do code and documentation contributions.

## Code

### Setup

You need latest NodeJS (^10.5.0) use [nvm](https://github.com/creationix/nvm) and [yarn](https://yarnpkg.com/en/docs/install#alternatives-stable) (^1.7.0) as package manager.

```sh
git clone https://github.com/algolia/angular-instantsearch.git
cd angular-instantsearch
```

### Run

You can access stories of Angular InstantSearch components by running the storybook with `yarn examples:storybook`.

There is also an e-commerce example consuming the built library and compliant to [AOT (compiles your app at build time)](https://angular.io/guide/aot-compiler) compiler. It must be run to test the library in production before any PRs.

You can use `> yarn examples:ecommerce` and open http://localhost:4200 to access the e-commerce example.

### Test

Tests are ran with [jest](https://facebook.github.io/jest/) and [jest-preset-angular](https://github.com/thymikee/jest-preset-angular).

* `> yarn test` -> run all tests
* `> yarn test:watch` -> run tests and watch for changes

## Releasing

1. go to the correct branch

    `git checkout develop`

2. release to the registry

    `npm run release`

3. update the docs

    `yarn doc:publish`
