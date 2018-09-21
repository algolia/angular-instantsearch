---
title: Guide - Customize widgets
layout: guide.pug
---

# Customize widgets

Angular InstantSearch comes with a set of UI widgets. Some of them have options to modify the HTML output (`<ng-template>`). But sometime that is not sufficient and you want to completely customise the rendering of a widget.

For this you can use our BaseWidget class.

Every of these widgets are built using the [InstantSearch.js connectors API](https://community.algolia.com/instantsearch.js/v2/connectors.html) which contains the logic of the widgets without the rendering.

### BaseWidget class

The `BaseWidget` class helps you to create new widgets using the InstantSearch.js connectors with Angular.

It encapsulate the logic to maintain the state of the widget in sync with the search and handles for you the initialisation and the dispose of the widget on Angular life cycle hooks.

Let's go step by step on how to write a custom widget using the `BaseWidget` class.

## Custom Menu Select widget

In this example we will create a new custom widget using the `BaseWidget` class and the [connectMenu](https://community.algolia.com/instantsearch.js/v2/connectors/connectMenu.html) InstantSearch.js connector.

The default menu widget renders a list of links, but we would like to render it as a select element instead.

### 1. Extending the `BaseWidget` class

First of all, you will need to write some boilerplate code in order to initialize correctly the `BaseWidget` class. This happens in the `constructor()` of your class extending the `BaseWidget` class.

```js
import { Component, Inject, forwardRef } from '@angular/core';
import { BaseWidget, NgAisInstantSearch } from 'angular-instantsearch';

@Component({
  selector: 'ais-menu-select',
  template: '<p>It works!</p>'
})
export class MenuSelect extends BaseWidget {
  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent
  ) {
    super('MenuSelect');
  }
}
```

* We need to reference the `<ais-instantsearch>` parent component instance on the widget class
* We need to indicate also the widget name

We have the first code needed for our MenuSelect widget, let's move on with the connector part!

### 2. Inject the `connnectMenu` connector

The `BaseWidget` class has a method called `createWidget()` which takes at first parameter the connector to use and as second parameters an object of options for this connector.

To know the options used by the connector we can refer to the [InstantSearch.js connectors API documentation](https://community.algolia.com/instantsearch.js/v2/connectors.html).

In our case, we will use the `connectMenu` which accepts multiple options but for simplicity we will only use the `attributeName` option which is the only one mandatory.

(The `attributeName` is the name of the attribute for faceting)

```js
import { Component, Inject, forwardRef } from '@angular/core';
import { BaseWidget, NgAisInstantSearch } from 'angular-instantsearch';
import { connectMenu } from 'instantsearch.js/es/connectors';

@Component({
  selector: 'ais-menu-select',
  template: '<p>It works!</p>'
})
export class MenuSelect extends BaseWidget {
  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent
  ) {
    super('MenuSelect');
  }

  public ngOnInit() {
    this.createWidget(connectMenu, { attributeName: 'categories' });
    super.ngOnInit();
  }
}
```

That's it, your widget is connected to InstantSearch.js and the state of the search itself! Now let's update the rendering of this widget

### 3. Render from the state

Your component instance has access to a property `this.state` which holds the rendering options of the widget.

From the [connectMenu](https://community.algolia.com/instantsearch.js/v2/connectors/connectMenu.html) InstantSearch.js connector documentation, we can see that we have access to:

* `items[]` -> The elements that can be refined for the current search results.
* `createURL(item.value)` -> Creates the URL for a single item name in the list.
* `refine(item.value)` -> Filter the search to item value.
* `canRefine` -> True if refinement can be applied.
* `isShowingMore` -> True if the menu is displaying all the menu items.
* `toggleShowMore` -> Toggles the number of values displayed between `limit` and `showMoreLimit`.
* `canToggleShowMore` -> `true` if the toggleShowMore button can be activated (enough items to display more or already displaying more than limit items).

For instance if you want to access the items, you will need to use `this.state.items` into your component code.

If you compile your Angular application with [AOT](https://angular.io/guide/aot-compiler) you will need to define the typings of the `state` class property. In this example it will look like this:

```js
state: {
  items: { label: string; value: string }[];
  createURL: () => string;
  refine: (value: string) => void;
  canRefine: boolean;
  isShowingMore: boolean;
  toggleShowMore: () => void;
  canToggleShowMore: boolean;
}
```

Last step, let's write together the component template:

```js
import { Component, Inject, forwardRef } from '@angular/core';
import { BaseWidget, NgAisInstantSearch } from 'angular-instantsearch';
import { connectMenu } from 'instantsearch.js/es/connectors';

@Component({
  selector: 'ais-menu-select',
  template: `
    <select
      class="menu-select"
      (change)="state.refine($event.target.value)"
    >
      <option
        *ngFor="let item of state.items"
        [value]="item.value"
        [selected]="item.isRefined"
      >
        {{item.label}}
      </option>
    </select>
  `
})
export class MenuSelect extends BaseWidget {
  state: {
    items: { label: string; value: string }[];
    createURL: () => string;
    refine: (value: string) => void;
    canRefine: boolean;
    isShowingMore: boolean;
    toggleShowMore: () => void;
    canToggleShowMore: boolean;
  }

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent
  ) {
    super('MenuSelect');
  }

  public ngOnInit() {
    this.createWidget(connectMenu, { attributeName: 'categories' });
    super.ngOnInit();
  }
}
```
In `app.module.ts`, make sure to add the component by doing `import { MenuSelect } from './menu.component';` and then adding `MenuSelect` to the `declarations`.

You can now use your directive `<ais-menu-select></ais-menu-select>` to display your custom MenuSelect widget!

We have a live example of this newly created MenuSelect in our [widget showcase](https://community.algolia.com/angular-instantsearch/examples/dev-novel/?selectedStory=Custom%20widgets.MenuSelect).
