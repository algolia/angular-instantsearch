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

storiesOf('QueryRuleCustomData', module)
  .addDecorator(meta)
  .add('default', () => ({
    component: wrapWithHits({
      ...moviesConfig,
      template: `
      <p>
        Type <q>music</q> and a banner appears.
      </p>

      <ais-query-rule-custom-data></ais-query-rule-custom-data>`,
    }),
  }))
  .add('custom items template', () => ({
    component: wrapWithHits({
      ...moviesConfig,
      template: `
      <p>
        Type <q>music</q> and a banner appears.
      </p>

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
      </ais-query-rule-custom-data>`,
    }),
  }))
  .add('with default banner', () => ({
    component: wrapWithHits({
      ...moviesConfig,
      template: `
      <p>
        Kill Bill appears whenever no other results are promoted. Type
        <q>music</q> to see another movie promoted.
      </p>

      <ais-query-rule-custom-data [transformItems]="transformItems">
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
      </ais-query-rule-custom-data>`,
      methods: {
        transformItems: (items: CustomDataItem[]) => {
          if (items.length > 0) {
            return [items[0]];
          }

          return [
            {
              title: 'Kill Bill',
              banner: 'http://static.bobatv.net/IMovie/mv_2352/poster_2352.jpg',
              link: 'https://www.netflix.com/title/60031236',
            },
          ];
        },
      },
    }),
  }))
  .add('picking first item with transformItems', () => ({
    component: wrapWithHits({
      ...moviesConfig,
      template: `
      <p>
        Type <q>music</q> and a banner appears.
      </p>

      <ais-query-rule-custom-data [transformItems]="transformItems">
      </ais-query-rule-custom-data>`,
      methods: {
        transformItems: (items: CustomDataItem[]) => [items[0]],
      },
    }),
  }))
  .add('keeping only banners with transformItems', () => ({
    component: wrapWithHits({
      ...moviesConfig,
      template: `
      <p>
        Type <q>not a banner</q> and nothing will appear.
      </p>

      <ais-query-rule-custom-data [transformItems]="transformItems">
      </ais-query-rule-custom-data>`,
      methods: {
        transformItems: (items: CustomDataItem[]) =>
          items.filter(item => Boolean(item.banner)),
      },
    }),
  }));
