import { storiesOf } from '@storybook/angular';
import { wrapWithHits } from '../wrap-with-hits';
import meta from '../meta';

const moviesConfig = {
  indexName: 'instant_search_movies',
  filters: `<ais-refinement-list attribute="genre"></ais-refinement-list>`,
  hits: `
  <ng-template let-hits="hits">
    <ol class="playground-hits">
      <li
        *ngFor="let hit of hits"
        class="hit playground-hits-item"
        id="hit-{{ hit.objectID }}"
      >
        <div
          class="playground-hits-image"
          [ngStyle]="{ 'background-image': 'url(' + hit.image + ')' }"
        ></div>

        <div class="playground-hits-desc">
          <p>
            <ais-highlight [hit]="hit" attribute="title"></ais-highlight>
          </p>
          <p>Genre: {{ hit.genre.join(", ") }}</p>
        </div>
      </li>
    </ol>
  </ng-template>
  `,
};

storiesOf('QueryRuleContext', module)
  .addDecorator(meta)
  .add('default', () => ({
    component: wrapWithHits({
      ...moviesConfig,
      template: `
      <ul>
        <li>Select the "Drama" category and The Shawshank Redemption appears</li>
        <li>Select the "Thriller" category and Pulp Fiction appears</li>
        <li>Type <q>music</q> and a banner will appear.</li>
      </ul>

      <ais-query-rule-context
        [trackedFilters]="trackedFilters"
      ></ais-query-rule-context>

      <ais-query-rule-custom-data>
        <ng-template let-items="items">
          <div *ngFor="let item of items">
            <h2>{{ item.title }}</h2>
            <a [href]="item.link">
              <img
                [src]="item.banner"
                [alt]="item.title"
                [style.width]="'100%'"
              />
            </a>
          </div>
        </ng-template>
      </ais-query-rule-custom-data>
      `,
      methods: {
        trackedFilters: {
          genre: () => ['Thriller', 'Drama'],
        },
      },
    }),
  }))
  .add('with initial filter applied', () => ({
    component: wrapWithHits({
      ...moviesConfig,
      template: `
    <ul>
      <li>
        Select the "Drama" category and The Shawshank Redemption appears
      </li>
      <li>Select the "Thriller" category and Pulp Fiction appears</li>
      <li>Type <q>music</q> and a banner will appear.</li>
    </ul>

    <ais-configure
      [searchParameters]="{
        disjunctiveFacetsRefinements: {
          genre: ['Drama']
        }
      }"
    ></ais-configure>

    <ais-query-rule-context
      [trackedFilters]="trackedFilters"
    ></ais-query-rule-context>

    <ais-query-rule-custom-data>
      <ng-template let-items="items">
        <div *ngFor="let item of items">
          <h2>{{ item.title }}</h2>
          <a [href]="item.link">
            <img
              [src]="item.banner"
              [alt]="item.title"
              [style.width]="'100%'"
            />
          </a>
        </div>
      </ng-template>
    </ais-query-rule-custom-data>
    `,
      methods: {
        trackedFilters: {
          genre: () => ['Thriller', 'Drama'],
        },
      },
    }),
  }))
  .add('with filter out "thriller" in generated rules', () => ({
    component: wrapWithHits({
      ...moviesConfig,
      template: `
    <ul>
      <li>
        Select the "Drama" category and The Shawshank Redemption appears
      </li>
      <li>Select the "Thriller" category and Pulp Fiction does not appear</li>
      <li>Type <q>music</q> and a banner will appear.</li>
    </ul>

    <ais-configure
      [searchParameters]="{
        disjunctiveFacetsRefinements: {
          genre: ['Drama']
        }
      }"
    ></ais-configure>

    <ais-query-rule-context
      [trackedFilters]="trackedFilters"
      [transformRuleContexts]="transformRuleContexts"
    ></ais-query-rule-context>

    <ais-query-rule-custom-data>
      <ng-template let-items="items">
        <div *ngFor="let item of items">
          <h2>{{ item.title }}</h2>
          <a [href]="item.link">
            <img
              [src]="item.banner"
              [alt]="item.title"
              [style.width]="'100%'"
            />
          </a>
        </div>
      </ng-template>
    </ais-query-rule-custom-data>
    `,
      methods: {
        trackedFilters: {
          genre: values => values,
        },
        transformRuleContexts: rules =>
          rules.filter(rule => rule.indexOf('Thriller') < 0),
      },
    }),
  }));
