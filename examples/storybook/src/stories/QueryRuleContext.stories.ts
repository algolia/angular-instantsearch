import { storiesOf } from '@storybook/angular';
import { wrapWithHits } from '../wrap-with-hits';
import meta from '../meta';

type CustomDataItem = {
  title: string;
  banner: string;
  link: string;
};

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
        <li>On empty query, select the "Drama" category and The Shawshank Redemption appears</li>
        <li>On empty query, select the "Thriller" category and Pulp Fiction appears</li>
        <li>Type <q>music</q> and This Is It appears.</li>
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
  .add('with initial filter', () => ({
    component: wrapWithHits({
      ...moviesConfig,
      template: `
    <ul>
      <li>
        "Drama" is filtered by default and The Shawshank Redemption appears
      </li>
      <li>
        On empty query, select the "Drama" category and The Shawshank Redemption appears
      </li>
      <li>On empty query, select the "Thriller" category and Pulp Fiction appears</li>
      <li>Type <q>music</q> and This Is It appears.</li>
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
  .add('with initial rule context', () => ({
    component: wrapWithHits({
      ...moviesConfig,
      template: `
    <ul>
      <li>
        The Shawshank Redemption appears by default when no other Query Rules match
      </li>
      <li>On empty query, select the "Thriller" category and Pulp Fiction appears</li>
      <li>Type <q>music</q> and This Is It appears.</li>
    </ul>

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
          genre: (values: string[]) => values,
        },
        transformRuleContexts: (ruleContexts: string[]) => {
          if (ruleContexts.length === 0) {
            return ['ais-genre-Drama'];
          }

          return ruleContexts;
        },
      },
    }),
  }));
