# angular-instantsearch
> ⚡️ Lightning-fast search for Angular2+ apps, by Algolia.


## Getting started

### Installation

First install `angular-instantsearch` via npm:

* `$ yarn add angular-instantsearch` OR
* `$ npm install --save angular-instantsearch`

Once installed you need to import our main module into your Angular application:

```ts
import { NgISModule } from 'angular-instantsearch';
```

The only remaining part is to list the imported module in your root module and in any additional application modules that make use of `angular-instantsearch`.

The exact method will be slightly different the root (top-level) module because you need to call `.forRoot()` static method from the `angular-instantsearch` main module.

* For your application root module:

```ts
import { NgISModule } from 'angular-instantsearch';

@NgModule({
  declarations: [AppComponent, ...],
  imports: [NgISModule.forRoot(), ...],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

* Other modules in your application can simply import `NgISModule`:

```ts
import { NgISModule } from 'angular-instantsearch';

@NgModule({
  declarations: [OtherComponent, ...],
  imports: [NgISModule, ...]
})
export class OtherModule {}
```

### Widgets

##### `<ngis-instantsearch></ngis-instantsearch>`

> Is the root component of all Angular InstantSearch implementations.

| Props    | Type     | Description
| -        | -        | -
| `config` | `object` | The config object to pass to the instantsearch instance

The config object has the same format as InstantSearch.js options, you can see the full available options [here](https://community.algolia.com/instantsearch.js/v2/instantsearch.html#struct-InstantSearchOptions).

Example:

```ts
@Component({
  selector: 'ngis-app',
  template: `
    <ngis-instantsearch [config]='config'>
    </ngis-instantsearch>
  `
})
export class AppComponent {
  public config = {
    apiKey: '6be0576ff61c053d5f9a3225e2a90f76',
    appId: 'latency',
    indexName: 'instant_search'
  };
}
```

---

##### `<ngis-search-box></ngis-search-box>`

> The SearchBox component displays a search box that lets the user search for a specific query.

| Props             | Type      | Description
| -                 | -         | -
| `placeholder?`    | `string`  | The label of the input placeholder.
| `submitTitle`     | `string`  | The submit button title.
| `resetTitle`      | `string`  | The reset button title.
| `searchAsYouType` | `boolean` | If you disable this option, new searches will only be triggered by clicking the search button or by pressing the enter key while the search box is focused.

---

##### `<ngis-hits></ngis-hits>`

> Displays a list of hits.

| Props     | Type     | Description
| -         | -        | -
| `header?` | `string` | Displays text before widget
| `footer?` | `string` | Displays text after widget

You can use the directive `<ng-template></ng-template>` to customize the output:

```ts
@Component({
  selector: 'my-app',
  template: `
    <ngis-hits>
      <ng-template let-hits="state.hits">
        <ul>
          <li *ngFor="let hit of hits">
            {{hit.name}}
          </li>
        </ul>
      </ng-template>
    </ngis-hits>
  `
})
export class AppComponent {}
```

---
