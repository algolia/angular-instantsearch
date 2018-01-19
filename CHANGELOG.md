<a name="1.0.0-beta.8"></a>
# [1.0.0-beta.8](https://github.com/algolia/angular-instantsearch/compare/1.0.0-beta.7...1.0.0-beta.8) (2018-01-19)


### Bug Fixes

* **BaseWidget:** default `state` property to an object ([e21a885](https://github.com/algolia/angular-instantsearch/commit/e21a885))
* **header-version:** use `version.ts` instead of `process.env` ([d76808a](https://github.com/algolia/angular-instantsearch/commit/d76808a))
* **release:** commit `src/version.ts` ([fa26371](https://github.com/algolia/angular-instantsearch/commit/fa26371))
* **release:** remove tag on abort ([e76a645](https://github.com/algolia/angular-instantsearch/commit/e76a645))


### Features

* **autoHideContainer:** add property to BaseWidget class ([c9043a8](https://github.com/algolia/angular-instantsearch/commit/c9043a8))
* **breadcrumb:** add autoHideContainer option ([db3ce89](https://github.com/algolia/angular-instantsearch/commit/db3ce89))
* **clearRefinements:** add autoHideContainer option ([8677875](https://github.com/algolia/angular-instantsearch/commit/8677875))
* **currentRefinements:** add autoHideContainer option ([497d9bd](https://github.com/algolia/angular-instantsearch/commit/497d9bd))
* **hiearchicalMenu:** add autoHideContainer option ([3bb4bb5](https://github.com/algolia/angular-instantsearch/commit/3bb4bb5))
* **menu:** add autoHideContainer option ([3e441ab](https://github.com/algolia/angular-instantsearch/commit/3e441ab))
* **numeric-menu:** add autoHideContainer option ([6309861](https://github.com/algolia/angular-instantsearch/commit/6309861))
* **rating-menu:** add autoHideContainer option ([ff5904b](https://github.com/algolia/angular-instantsearch/commit/ff5904b))
* **refinementList:** add autoHideContainer option ([9fd2d0d](https://github.com/algolia/angular-instantsearch/commit/9fd2d0d))
* **results-per-page:** add autoHideContainer option ([2e0bfaf](https://github.com/algolia/angular-instantsearch/commit/2e0bfaf))



<a name="1.0.0-beta.7"></a>
# [1.0.0-beta.7](https://github.com/algolia/angular-instantsearch/compare/1.0.0-beta.6...1.0.0-beta.7) (2017-12-11)


### Features

* **requests:** send custom agent ([141f974](https://github.com/algolia/angular-instantsearch/commit/141f974))
* **scripts/release:** build library after update version ([3ec0576](https://github.com/algolia/angular-instantsearch/commit/3ec0576))



<a name="1.0.0-beta.6"></a>
# [1.0.0-beta.6](https://github.com/algolia/angular-instantsearch/compare/1.0.0-beta.5...1.0.0-beta.6) (2017-12-07)


### Bug Fixes

* **algoliasearchclient:** handle request errors ([2654000](https://github.com/algolia/angular-instantsearch/commit/2654000))
* **dist:** add missing dependencies ([1c41fbc](https://github.com/algolia/angular-instantsearch/commit/1c41fbc))
* **import:** workaround to make dev + build work ([56a4e25](https://github.com/algolia/angular-instantsearch/commit/56a4e25))
* **rollup:** remove build warnings ([af094a0](https://github.com/algolia/angular-instantsearch/commit/af094a0))
* **svg:** remove `xmlns` attribute not support ng5 ssr ([cb03f17](https://github.com/algolia/angular-instantsearch/commit/cb03f17))


### Features

* **base-widget:** dont run `ngOnDestroy` on SSR ([457cca8](https://github.com/algolia/angular-instantsearch/commit/457cca8))
* **examples/ssr:** add `preboot` to avoid blinking ([c44eda9](https://github.com/algolia/angular-instantsearch/commit/c44eda9))
* **instance:** custom algoliasearch client for SSR ([dc374ba](https://github.com/algolia/angular-instantsearch/commit/dc374ba))
* **ssr:** provide `createAlgoliaSSRClient()` ([90d30f3](https://github.com/algolia/angular-instantsearch/commit/90d30f3))
* **ssr:** provide `parseServerRequest()` util ([ad12adb](https://github.com/algolia/angular-instantsearch/commit/ad12adb))



<a name="1.0.0-beta.5"></a>
# [1.0.0-beta.5](https://github.com/algolia/angular-instantsearch/compare/1.0.0-beta.4...1.0.0-beta.5) (2017-12-06)


### Bug Fixes

* **scripts:** use full path to `ng` binary ([4a8dcf0](https://github.com/algolia/angular-instantsearch/commit/4a8dcf0))


### Features

* **examples:** add two page SPA ([32cbe35](https://github.com/algolia/angular-instantsearch/commit/32cbe35))
* **examples:** angular router bootstrap ([2a26a6e](https://github.com/algolia/angular-instantsearch/commit/2a26a6e))
* **scripts:** add `run-example` script ([1d292d2](https://github.com/algolia/angular-instantsearch/commit/1d292d2))



<a name="1.0.0-beta.4"></a>
# [1.0.0-beta.4](https://github.com/algolia/angular-instantsearch/compare/1.0.0-beta.3...1.0.0-beta.4) (2017-11-22)


### Bug Fixes

* **dev:** wrong webpack rootPath on dev ([969a840](https://github.com/algolia/angular-instantsearch/commit/969a840))
* **examples/ecommerce:** replace price-ranges widget ([c11fec8](https://github.com/algolia/angular-instantsearch/commit/c11fec8))
* **menu:** apply `selected` class when item isRefined ([794d12f](https://github.com/algolia/angular-instantsearch/commit/794d12f))
* **menu:** intercept <a> click event ([2991f93](https://github.com/algolia/angular-instantsearch/commit/2991f93))
* **scripts/release:** reset command on fail ([4a8ada9](https://github.com/algolia/angular-instantsearch/commit/4a8ada9))
* **scripts/release:** update correctly CHANGELOG.md ([58f2d11](https://github.com/algolia/angular-instantsearch/commit/58f2d11))


### Features

* **docs:** add doc folder ([cabc8cd](https://github.com/algolia/angular-instantsearch/commit/cabc8cd))
* **instantsearch:** allow `(change)` event binding ([d4159df](https://github.com/algolia/angular-instantsearch/commit/d4159df))
* **numeric-range:** add widget ([6efd241](https://github.com/algolia/angular-instantsearch/commit/6efd241))
* **numeric-range:** remove `price-ranges` widget ([83a0bf8](https://github.com/algolia/angular-instantsearch/commit/83a0bf8))



<a name="1.0.0-beta.3"></a>
# [1.0.0-beta.3](https://github.com/algolia/angular-instantsearch/compare/1.0.0-beta.2...1.0.0-beta.3) (2017-11-20)

### Breaking Changes

Several widgets changed name, these will be the next naming for every InstantSearch library:

| Before | Now |
| ------ | --- |
| `<ng-ais-clear-all>` | `<ng-ais-clear-refinements>` |
| `<ng-ais-current-refined-values>` | `<ng-ais-current-refinements>` |
| `<ng-ais-numeric-refinement-list>` | `<ng-ais-numeric-menu>` |
| `<ng-ais-hits>` | `<ng-ais-results>` |
| `<ng-ais-infinite-hits>` | `<ng-ais-infinite-results>` |
| `<ng-ais-hits-per-page-selector>` | `<ng-ais-results-per-page>` |
| `<ng-ais-sort-by-selector>` | `<ng-ais-sort-by>` |
| `<ng-ais-star-rating>` | `<ng-ais-rating-menu>` |


### Bug Fixes

* **lib:** wrong import path for results module ([6f94e79](https://github.com/algolia/angular-instantsearch/commit/6f94e79))
* **search-box:** update markup to match instantsearch.css ([2afddf1](https://github.com/algolia/angular-instantsearch/commit/2afddf1))
* **webpack:** rootPath should be `/dev-novel` ([d037d7c](https://github.com/algolia/angular-instantsearch/commit/d037d7c))
* **widges:** update className as well ([2f1d0a8](https://github.com/algolia/angular-instantsearch/commit/2f1d0a8))


### Features

* **dev-novel:** write component stories ([0e77ab2](https://github.com/algolia/angular-instantsearch/commit/0e77ab2))
* **netlify:** add script to run ([902a9be](https://github.com/algolia/angular-instantsearch/commit/902a9be))



<a name="1.0.0-beta.2"></a>
# [1.0.0-beta.2](https://github.com/algolia/angular-instantsearch/compare/1.0.0-beta.1...1.0.0-beta.2) (2017-11-16)


### Bug Fixes

* **aot:** ship original `.js` and `.js.map` files with package ([f32a3d2](https://github.com/algolia/angular-instantsearch/commit/f32a3d2))
* **examples/ecommerce:** import instantsearch styles into .scss ([9412cd3](https://github.com/algolia/angular-instantsearch/commit/9412cd3))
* **rollup:** suppress warnings ([f48939e](https://github.com/algolia/angular-instantsearch/commit/f48939e))
* **src:** include typings inside components ([c99389f](https://github.com/algolia/angular-instantsearch/commit/c99389f))


### Features

* **clear-all:** add disabled class on button ([3b059da](https://github.com/algolia/angular-instantsearch/commit/3b059da))
* **examples/ecommerce:** build with AOT ([56a3014](https://github.com/algolia/angular-instantsearch/commit/56a3014))
* **menu:** add disbled class on showMore ([7b7a086](https://github.com/algolia/angular-instantsearch/commit/7b7a086))



<a name="1.0.0-beta.1"></a>
# [1.0.0-beta.1](https://github.com/algolia/angular-instantsearch/compare/8539fb4...1.0.0-beta.1) (2017-11-15)


### Bug Fixes

* **bem:** capitalize manually ([99ce670](https://github.com/algolia/angular-instantsearch/commit/99ce670))
* **build:** only find files for delete ([4156c9c](https://github.com/algolia/angular-instantsearch/commit/4156c9c))
* **build:** webpack -> rollup ([affc09c](https://github.com/algolia/angular-instantsearch/commit/affc09c))
* **build:ecommerce:** use `cp` instead of `yarn link` ([16290aa](https://github.com/algolia/angular-instantsearch/commit/16290aa))
* **circleci:** wrong test command ([eaca294](https://github.com/algolia/angular-instantsearch/commit/eaca294))
* **clear-all:** data-binding for disabled state ([ba001eb](https://github.com/algolia/angular-instantsearch/commit/ba001eb))
* **currentRefinedValues:** display `clearAll` before if it's true ([1027c23](https://github.com/algolia/angular-instantsearch/commit/1027c23))
* **demo:** rename limit options ([2d75854](https://github.com/algolia/angular-instantsearch/commit/2d75854))
* **dist/package.json:** change repo name, move to dependencies ([a99c4b6](https://github.com/algolia/angular-instantsearch/commit/a99c4b6))
* **hierarchical-menu:** default same separator as connector ([be7c713](https://github.com/algolia/angular-instantsearch/commit/be7c713))
* **highlight:** export module ([7b676c5](https://github.com/algolia/angular-instantsearch/commit/7b676c5))
* **highlight:** use `escapeHits` ([1ecaa12](https://github.com/algolia/angular-instantsearch/commit/1ecaa12))
* **highlight:** use `tagName` ([985fcd0](https://github.com/algolia/angular-instantsearch/commit/985fcd0))
* **hits:** provide full state ([834600a](https://github.com/algolia/angular-instantsearch/commit/834600a))
* **hits:** provide transformed hits to template ([6371e0b](https://github.com/algolia/angular-instantsearch/commit/6371e0b))
* **infinite-hits:** apply `transformItems` ([5c665b8](https://github.com/algolia/angular-instantsearch/commit/5c665b8))
* **netlify:** correct published directory path ([4443f52](https://github.com/algolia/angular-instantsearch/commit/4443f52))
* **netlify:** directy to examples/e-commerce/dist ([4d54a86](https://github.com/algolia/angular-instantsearch/commit/4d54a86))
* **pagination:** allow refine of last page ([6f90d37](https://github.com/algolia/angular-instantsearch/commit/6f90d37))
* **pagination:** dont refine if page is not in range ([51a1e59](https://github.com/algolia/angular-instantsearch/commit/51a1e59))
* **pagination:** dont use `pagesPadding` when not enough `nbPages` ([5822fe8](https://github.com/algolia/angular-instantsearch/commit/5822fe8))
* **pagination:** padding calculation ([461331d](https://github.com/algolia/angular-instantsearch/commit/461331d))
* **pagination:** respecte `pagesPagging` prop ([50cc585](https://github.com/algolia/angular-instantsearch/commit/50cc585))
* **range-slider:** handle case range.min === range.max ([6372fa4](https://github.com/algolia/angular-instantsearch/commit/6372fa4))
* **range-slider:** use `connectRange` ([3dc5faf](https://github.com/algolia/angular-instantsearch/commit/3dc5faf))
* **src:** complies to AOT compile rules ([f28fd0f](https://github.com/algolia/angular-instantsearch/commit/f28fd0f))
* **src:** export typings to .d.ts ([d021270](https://github.com/algolia/angular-instantsearch/commit/d021270))
* **svg:** use `[ngClass]` ([af74ec2](https://github.com/algolia/angular-instantsearch/commit/af74ec2))
* **webpack:** re-add angular2-template-loader ([013e46d](https://github.com/algolia/angular-instantsearch/commit/013e46d))


### Features

* **ngis-instantsearch:** add root component ([8539fb4](https://github.com/algolia/angular-instantsearch/commit/8539fb4))
* **base-widget:** explicit typing `updateState` ([656b875](https://github.com/algolia/angular-instantsearch/commit/656b875))
* **bem:** accept subelement ([f1bd795](https://github.com/algolia/angular-instantsearch/commit/f1bd795))
* **build:** introcude `yarn build` ([11db04b](https://github.com/algolia/angular-instantsearch/commit/11db04b))
* **components:** add header/footer ([d18edb9](https://github.com/algolia/angular-instantsearch/commit/d18edb9))
* **currentRefinedValues:** add `transformItems` option ([a823428](https://github.com/algolia/angular-instantsearch/commit/a823428))
* **demo:** use instantsearch.css ([3ef58b4](https://github.com/algolia/angular-instantsearch/commit/3ef58b4))
* **ecommerce:** include base style ([512fdc8](https://github.com/algolia/angular-instantsearch/commit/512fdc8))
* **examples:** bootstrap e-commerce ([c9aa6e1](https://github.com/algolia/angular-instantsearch/commit/c9aa6e1))
* **examples/ecommerce:** optimize hits images ([b02c4de](https://github.com/algolia/angular-instantsearch/commit/b02c4de))
* **hierarchicalMenu:** add `transformItems` option ([929a870](https://github.com/algolia/angular-instantsearch/commit/929a870))
* **highlight:** when search on refinement list ([1b31e44](https://github.com/algolia/angular-instantsearch/commit/1b31e44))
* **hits:** add `transformItems` option ([ea4d607](https://github.com/algolia/angular-instantsearch/commit/ea4d607))
* **hits:** re-use `BaseWidget` and add header/footer ([2f25f62](https://github.com/algolia/angular-instantsearch/commit/2f25f62))
* **hits:** remove widget on destroy ([b939cbc](https://github.com/algolia/angular-instantsearch/commit/b939cbc))
* **hits:** specificy correct css classes ([8ada826](https://github.com/algolia/angular-instantsearch/commit/8ada826))
* **hits:** use `<ng-ais-highlight>` ([a6e49e6](https://github.com/algolia/angular-instantsearch/commit/a6e49e6))
* **hits:** use `noop` as `unmountFn` ([bb54eab](https://github.com/algolia/angular-instantsearch/commit/bb54eab))
* **infinite-hits:** use `<ng-ais-highlight>` ([c9e2b0c](https://github.com/algolia/angular-instantsearch/commit/c9e2b0c))
* **instantsearch:** set highlight tag config ([0ad85de](https://github.com/algolia/angular-instantsearch/commit/0ad85de))
* **instantsearch-instance:** addWidget() ([e540250](https://github.com/algolia/angular-instantsearch/commit/e540250))
* **menu:** add `transformItems` option ([a9cf013](https://github.com/algolia/angular-instantsearch/commit/a9cf013))
* **pagination:** apply disabled class name ([bd045a5](https://github.com/algolia/angular-instantsearch/commit/bd045a5))
* **pagination:** apply selected class ([2124cc1](https://github.com/algolia/angular-instantsearch/commit/2124cc1))
* **pagination:** inline template for simplicity ([82a997a](https://github.com/algolia/angular-instantsearch/commit/82a997a))
* **range-slider:** copy behaviour from slider v1 ([6e0a626](https://github.com/algolia/angular-instantsearch/commit/6e0a626))
* **range-slider:** remove ng2-nouislider ([90bcab0](https://github.com/algolia/angular-instantsearch/commit/90bcab0))
* **refinement-list:** add `withSearchBox` option ([2a7c885](https://github.com/algolia/angular-instantsearch/commit/2a7c885))
* **refinementList:** add `trasnformItems` option ([9b7a007](https://github.com/algolia/angular-instantsearch/commit/9b7a007))
* **search-box:** forward on* events to parent component ([ab29ae1](https://github.com/algolia/angular-instantsearch/commit/ab29ae1))
* **typings:** extract typings ([7168a5f](https://github.com/algolia/angular-instantsearch/commit/7168a5f))
* **utils:** add css class name generator ([4751f8b](https://github.com/algolia/angular-instantsearch/commit/4751f8b))
* **utils:** add parse @Input number ([b06785c](https://github.com/algolia/angular-instantsearch/commit/b06785c))
* **widgets:** add `<ngis-breadcrumb>` ([88a862d](https://github.com/algolia/angular-instantsearch/commit/88a862d))
* **widgets:** add `<ngis-clear-all>` ([f1814eb](https://github.com/algolia/angular-instantsearch/commit/f1814eb))
* **widgets:** add `<ngis-current-refined-values />` ([32ad581](https://github.com/algolia/angular-instantsearch/commit/32ad581))
* **widgets:** add `<ngis-hierarchical-menu>` ([8d322e7](https://github.com/algolia/angular-instantsearch/commit/8d322e7))
* **widgets:** add `<ngis-hits-per-page-selector>` ([ff318ff](https://github.com/algolia/angular-instantsearch/commit/ff318ff))
* **widgets:** add `<ngis-infinite-hits>` ([820db1c](https://github.com/algolia/angular-instantsearch/commit/820db1c))
* **widgets:** add `<ngis-menu>` ([b1ffd65](https://github.com/algolia/angular-instantsearch/commit/b1ffd65))
* **widgets:** add `<ngis-numeric-refinement-list>` ([490c024](https://github.com/algolia/angular-instantsearch/commit/490c024))
* **widgets:** add `<ngis-numeric-selector>` ([560303f](https://github.com/algolia/angular-instantsearch/commit/560303f))
* **widgets:** add `<ngis-price-ranges>` ([f8d811a](https://github.com/algolia/angular-instantsearch/commit/f8d811a))
* **widgets:** add `<ngis-refinement-list />` ([e01ff89](https://github.com/algolia/angular-instantsearch/commit/e01ff89))
* **widgets:** add `<ngis-sort-by-selector>` ([4074d89](https://github.com/algolia/angular-instantsearch/commit/4074d89))
* **widgets:** add `<ngis-star-rating>` ([fa8fe63](https://github.com/algolia/angular-instantsearch/commit/fa8fe63))
* **widgets:** add `<ngis-stats>` ([db77ec3](https://github.com/algolia/angular-instantsearch/commit/db77ec3))
* **widgets:** add `<ngis-toggle>` ([9f5abd7](https://github.com/algolia/angular-instantsearch/commit/9f5abd7))
* **widgets:** add highlight ([9f0efb0](https://github.com/algolia/angular-instantsearch/commit/9f0efb0))
* **widgets:** add hits ([dcd73c8](https://github.com/algolia/angular-instantsearch/commit/dcd73c8))
* **widgets:** add range slider ([15bc352](https://github.com/algolia/angular-instantsearch/commit/15bc352))
* **widgets:** add search-box ([5cda27e](https://github.com/algolia/angular-instantsearch/commit/5cda27e))
* **widgets:** add simple pagination ([f87a6e1](https://github.com/algolia/angular-instantsearch/commit/f87a6e1))


### Performance Improvements

* **hits:** avoid re-render loop with getters ([18594b4](https://github.com/algolia/angular-instantsearch/commit/18594b4))
