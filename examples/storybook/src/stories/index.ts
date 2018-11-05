import { storiesOf, moduleMetadata } from '@storybook/angular';

import * as algoliasearch from 'algoliasearch/lite';
import { NgAisModule } from 'angular-instantsearch';
import '!style-loader!css-loader!../styles.css';

import { wrapWithHits } from '../wrap-with-hits';
import { MenuSelect, Refresh } from '../custom-widgets';

const meta = moduleMetadata({
  imports: [NgAisModule.forRoot()],
});

storiesOf('InstantSearchJS', module)
  .addDecorator(meta)
  .add('with algoliasearch search client', () => ({
    component: wrapWithHits({
      template: '',
      searchClient: algoliasearch(
        'latency',
        '6be0576ff61c053d5f9a3225e2a90f76'
      ),
    }),
  }));

storiesOf('Breadcrumb', module)
  .addDecorator(meta)
  .add('default', () => ({
    component: wrapWithHits({
      template: `
      <ais-breadcrumb
        [attributes]="[
          'hierarchicalCategories.lvl0',
          'hierarchicalCategories.lvl1',
          'hierarchicalCategories.lvl2'
        ]"
      >
      </ais-breadcrumb>
    `,
      searchParameters: {
        hierarchicalFacetsRefinements: {
          'hierarchicalCategories.lvl0': [
            'Cameras & Camcorders > Digital Cameras',
          ],
        },
      },
    }),
  }));

storiesOf('ClearRefinements', module)
  .addDecorator(meta)
  .add('default', () => ({
    component: wrapWithHits({
      template: '<ais-clear-refinements></ais-clear-refinements>',
      searchParameters: {
        disjunctiveFacetsRefinements: { brand: ['Apple'] },
        disjunctiveFacets: ['brand'],
      },
    }),
  }))
  .add('with nothing to clear', () => ({
    component: wrapWithHits({
      template: '<ais-clear-refinements></ais-clear-refinements>',
    }),
  }))
  .add('with clear refinements and query', () => ({
    component: wrapWithHits({
      template:
        "<ais-clear-refinements [clearsQuery]='true'></ais-clear-refinements>",
      searchParameters: {
        disjunctiveFacetsRefinements: { brand: ['Apple'] },
        disjunctiveFacets: ['brand'],
      },
    }),
  }));

storiesOf('CurrentRefinements', module)
  .addDecorator(meta)
  .add('default', () => ({
    component: wrapWithHits({
      template: '<ais-current-refinements></ais-current-refinements>',
      searchParameters: {
        disjunctiveFacetsRefinements: { brand: ['Apple', 'Samsung'] },
        disjunctiveFacets: ['brand'],
        numericRefinements: { price: { '>=': [100] } },
      },
    }),
  }))
  .add('with panel header', () => ({
    component: wrapWithHits({
      template: `
        <ais-panel header='Current refinements'>
          <ais-current-refinements></ais-current-refinements>
        </ais-panel>
      `,
      searchParameters: {
        disjunctiveFacetsRefinements: { brand: ['Apple', 'Samsung'] },
        disjunctiveFacets: ['brand'],
        numericRefinements: { price: { '>=': [100] } },
      },
    }),
  }))
  .add('with panel header but no refinements', () => ({
    component: wrapWithHits({
      template: `
        <ais-panel header='Current refinements'>
          <ais-current-refinements>
          </ais-current-refinements>
        </ais-panel>
      `,
    }),
  }))
  .add('with clearsQuery', () => ({
    component: wrapWithHits({
      template: `
        <ais-panel header='Current refinements'>
          <ais-current-refinements [clearsQuery]="true">
          </ais-current-refinements>
        </ais-panel>
      `,
      searchParameters: {
        disjunctiveFacetsRefinements: { brand: ['Apple', 'Samsung'] },
        disjunctiveFacets: ['brand'],
        numericRefinements: { price: { '>=': [100] } },
      },
    }),
  }));

storiesOf('HierarchicalMenu', module)
  .addDecorator(meta)
  .add('default', () => ({
    component: wrapWithHits({
      template: `
    <ais-hierarchical-menu
      [attributes]="[
        'hierarchicalCategories.lvl0',
        'hierarchicalCategories.lvl1',
        'hierarchicalCategories.lvl2'
      ]"
    >
    </ais-hierarchical-menu>
  `,
    }),
  }))
  .add('hide parent level', () => ({
    component: wrapWithHits({
      template: `
        <ais-hierarchical-menu
          [showParentLevel]="false"
          [attributes]="[
            'hierarchicalCategories.lvl0',
            'hierarchicalCategories.lvl1',
            'hierarchicalCategories.lvl2'
          ]"
        >
        </ais-hierarchical-menu>
      `,
    }),
  }))
  .add('with default selected item', () => ({
    component: wrapWithHits({
      template: `
        <ais-hierarchical-menu
          [attributes]="[
            'hierarchicalCategories.lvl0',
            'hierarchicalCategories.lvl1',
            'hierarchicalCategories.lvl2'
          ]"
        >
        </ais-hierarchical-menu>
      `,
      searchParameters: {
        hierarchicalFacetsRefinements: {
          'hierarchicalCategories.lvl0': [
            'Cameras & Camcorders > Digital Cameras',
          ],
        },
      },
    }),
  }));

storiesOf('Hits', module)
  .addDecorator(meta)
  .add('default', () => ({
    component: wrapWithHits({
      template: '<ais-hits></ais-hits>',
    }),
  }));

storiesOf('HitsPerPage', module)
  .addDecorator(meta)
  .add('default', () => ({
    component: wrapWithHits({
      template: `
      <ais-hits-per-page
        [items]="[
          { value: 3, label: '3 per page' },
          { value: 5, label: '5 per page' },
          { value: 10, label: '10 per page' }
        ]"
      >
      </ais-hits-per-page>
    `,
    }),
  }))
  .add('with default to 5', () => ({
    component: wrapWithHits({
      template: `
        <ais-hits-per-page
          [items]="[
            { value: 3, label: '3 per page' },
            { value: 5, label: '5 per page', default: true },
            { value: 10, label: '10 per page' }
          ]"
        >
        </ais-hits-per-page>
      `,
    }),
  }));

storiesOf('InfiniteHits', module)
  .addDecorator(meta)
  .add('default', () => ({
    component: wrapWithHits({
      template: '<ais-infinite-hits></ais-infinite-hits>',
    }),
  }))
  .add('with custom template', () => ({
    component: wrapWithHits({
      template: `
        <ais-infinite-hits>
          <ng-template
            let-hits="hits"
            let-showMore="showMore"
          >
            <div *ngFor="let hit of hits">
              <strong>{{hit.name}}</strong>
            </div>
            <button (click)="showMore()">Load more</button>
          </ng-template>
        </ais-infinite-hits>
      `,
    }),
  }));

storiesOf('Menu', module)
  .addDecorator(meta)
  .add('default', () => ({
    component: wrapWithHits({
      template: '<ais-menu attribute="categories"></ais-menu>',
    }),
  }))
  .add('with showMore and panel header', () => ({
    component: wrapWithHits({
      template: `
        <ais-panel header="Categories">
          <ais-menu
            attribute="categories"
            [limit]="3"
            [showMoreLimit]="10"
          >
          </ais-menu>
        </ais-panel>
      `,
    }),
  }));

storiesOf('NumericMenu', module)
  .addDecorator(meta)
  .add('default with panel header', () => ({
    component: wrapWithHits({
      template: `
      <ais-panel header="Numeric menu (price)">
        <ais-numeric-menu
          attribute="price"
          operator="or"
          [items]="[
            { name: 'All' },
            { end: 4, name: 'less than 4' },
            { start: 4, end: 4, name: '4' },
            { start: 5, end: 10, name: 'between 5 and 10' },
            { start: 10, name: 'more than 10' }
          ]"
        >
        </ais-numeric-menu>
      </ais-panel>
    `,
    }),
  }));

storiesOf('NumericSelector', module)
  .addDecorator(meta)
  .add('default', () => ({
    component: wrapWithHits({
      template: `
        <ais-numeric-selector
          attribute="popularity"
          operator=">="
          [items]="[
            { label: 'Default', value: 0 },
            { label: 'Top 10', value: 21459 },
            { label: 'Top 100', value: 21369 },
            { label: 'Top 500', value: 20969 }
          ]"
        >
        </ais-numeric-selector>
      `,
    }),
  }))
  .add('with default value', () => ({
    component: wrapWithHits({
      template: `
        <ais-numeric-selector
          attribute="rating"
          operator="="
          [items]="[
            { label: 'No rating selected', value: undefined },
            { label: 'Rating: 5', value: 5 },
            { label: 'Rating: 4', value: 4 },
            { label: 'Rating: 3', value: 3 },
            { label: 'Rating: 2', value: 2 },
            { label: 'Rating: 1', value: 1 }
          ]"
        >
        </ais-numeric-selector>
      `,
    }),
  }));

storiesOf('Pagination', module)
  .addDecorator(meta)
  .add('default', () => ({
    component: wrapWithHits({
      template: '<ais-pagination></ais-pagination>',
    }),
  }));

storiesOf('RefinementList', module)
  .addDecorator(meta)
  .add('default with panel header', () => ({
    component: wrapWithHits({
      template: `
        <ais-panel header="Brand">
          <ais-refinement-list
            attribute="brand"
            operator="or"
            [limit]="10"
          >
          </ais-refinement-list>
        </ais-panel>
      `,
    }),
  }))
  .add('panel header with showMore', () => ({
    component: wrapWithHits({
      template: `
        <ais-panel header="Brand with show more">
          <ais-refinement-list
            attribute="brand"
            operator="or"
            [limit]="3"
            [showMoreLimit]="10"
          >
          </ais-refinement-list>
        </ais-panel>
      `,
    }),
  }))
  .add('panel header with search inside the items', () => ({
    component: wrapWithHits({
      template: `
        <ais-panel header="Searchable brands">
          <ais-refinement-list
            attribute="brand"
            operator="or"
            searchPlaceholder="Find other brands..."
            [searchable]="true"
            [limit]="10"
          >
          </ais-refinement-list>
        </ais-panel>
      `,
    }),
  }))
  .add('panel header with operator `and`', () => ({
    component: wrapWithHits({
      template: `
        <ais-panel header="Price ranges">
          <ais-refinement-list
            attribute="price_range"
            operator="and"
            [limit]="10"
            [transformItems]="transformItems"
          >
          </ais-refinement-list>
        </ais-panel>
      `,
      methods: {
        transformItems: items =>
          items.map(item => {
            item.highlighted = item.highlighted
              .replace(/(\d+) - (\d+)/, '$$$1 - $$$2')
              .replace(/> (\d+)/, '> $$$1');
            return item;
          }),
      },
    }),
  }));

storiesOf('SearchBox', module)
  .addDecorator(meta)
  .add('default', () => ({
    component: wrapWithHits({
      template:
        "<ais-search-box placeholder='Search for products'></ais-search-box>",
    }),
  }))
  .add('search on enter', () => ({
    component: wrapWithHits({
      template: `
        <ais-search-box
          [autofocus]="true"
          placeholder="Search for products"
          [searchAsYouType]="false"
        >
        </ais-search-box>
      `,
    }),
  }));

storiesOf('SortBy', module)
  .addDecorator(meta)
  .add('default', () => ({
    component: wrapWithHits({
      template: `
      <ais-sort-by
        [items]="[
          { name: 'instant_search', label: 'Most relevant' },
          { name: 'instant_search_price_asc', label: 'Lowest price' },
          { name: 'instant_search_price_desc', label: 'Highest price' }
        ]"
      >
      </ais-sort-by>
    `,
    }),
  }));

storiesOf('RatingMenu', module)
  .addDecorator(meta)
  .add('default with panel header', () => ({
    component: wrapWithHits({
      template: `
      <ais-panel header="Rating">
        <ais-rating-menu
          attribute="rating"
          [max]="5"
        >
        </ais-rating-menu>
      </ais-panel>
    `,
    }),
  }));

storiesOf('Stats', module)
  .addDecorator(meta)
  .add('default', () => ({
    component: wrapWithHits({
      template: '<ais-stats></ais-stats>',
    }),
  }));

storiesOf('Toggle', module)
  .addDecorator(meta)
  .add('with single value', () => ({
    component: wrapWithHits({
      template: `
        <ais-toggle
          label="Free Shipping (toggle single value)"
          attribute="free_shipping"
        >
        </ais-toggle>
      `,
    }),
  }))
  .add('with on & off values', () => ({
    component: wrapWithHits({
      template: `
        <ais-toggle
          label="Canon (not checked) or Sony (checked)"
          attribute="brand"
          [values]="{
            on: 'Sony',
            off: 'Canon'
          }"
        >
        </ais-toggle>
      `,
    }),
  }));

storiesOf('RangeInput', module)
  .addDecorator(meta)
  .add('default', () => ({
    component: wrapWithHits({
      template: `
      <ais-range-input attribute="price">
      </ais-range-input>
    `,
    }),
  }));

storiesOf('Custom widgets', module)
  .addDecorator(meta)
  .addDecorator(
    moduleMetadata({
      declarations: [MenuSelect, Refresh],
    })
  )
  .add('MenuSelect', () => ({
    component: wrapWithHits({
      template: `<ais-menu-select></ais-menu-select>`,
    }),
  }))
  .add('Refresh', () => ({
    component: wrapWithHits({
      template: `<ais-refresh></ais-refresh>`,
    }),
  }));

storiesOf('RangeSlider', module)
  .addDecorator(meta)
  .add('default', () => ({
    component: wrapWithHits({
      template: `
      <ais-range-slider attribute="price">
      </ais-range-slider>
    `,
    }),
  }));

storiesOf('Configure', module)
  .addDecorator(meta)
  .add('with 1 hit per page', () => ({
    component: wrapWithHits({
      template: `
      <p>This widget renders nothing, here we are forcing hitsPerPage to 1</p>
      <ais-configure [searchParameters]="{ hitsPerPage: 1 }">
      </ais-configure>
    `,
    }),
  }))
  .add('Toggle between hitsPerPage', () => ({
    component: wrapWithHits({
      template: `
      <p>Toggle <code>hitsPerPage</code></p>
      <pre>{{searchParams | json}}</pre>
      <button (click)="toggleSearchParams()">toggle</button>
      <ais-configure [searchParameters]="searchParams"></ais-configure>
    `,
      methods: {
        searchParams: { hitsPerPage: 1 },
        toggleSearchParams() {
          this.searchParams.hitsPerPage =
            this.searchParams.hitsPerPage === 1 ? 10 : 1;
        },
      },
    }),
  }));
