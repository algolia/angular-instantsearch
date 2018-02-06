## `<ng-ais-infinite-hits />`

Displays a list of hits.

| Attribures            | Type     | Description
| -                     | -        | -
| `showMoreLabel?`      | `string` | Label used on the show more button.

You can use the directive `<ng-template></ng-template>` to customize the output:

```html
<ng-ais-infinite-hits>
  <ng-template
    let-hits="hits"
    let-results="results"
    let-showMore="showMore"
  >
    <!-- No results message -->
    <div *ngIf="hits.length === 0">
      No results found matching <strong>{{results.query}}</strong>.
    </div>

    <!-- Hit template -->
    <div *ngFor="let hit of hits">
      <h1>
        <ng-ais-highlight
          attributeName="title"
          [hit]="hit"
        >
        </ng-ais-highlight>
      </h1>

      <p>{{hit.description}}</p>
    </div>

    <!-- Load more hits button -->
    <button (click)="showMore()">Load more</button>
  </ng-template>
</ng-ais-infinite-hits>
```
