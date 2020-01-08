import { storiesOf } from '@storybook/angular';
import { wrapWithHits } from '../wrap-with-hits';
import meta from '../meta';

storiesOf('ConfigureRelatedItems', module)
  .addDecorator(meta)
  .add('default', () => {
    return {
      component: wrapWithHits({
        template: `
        <div>
          <ais-index indexName="instant_search">
            <ais-configure [searchParameters]="{ hitsPerPage: 1 }"></ais-configure>
            <ais-hits>
              <ng-template let-hits="hits">
                <div *ngFor="let hit of hits">
                  <div class="ais-RelatedHits-item-image">
                    <img [src]="hit.image" [alt]="hit.name" />
                  </div>

                  <div class="ais-RelatedHits-item-title">
                    <h4>{{hit.name}}</h4>
                  </div>
                </div>
              </ng-template>
            </ais-hits>
          </ais-index>

          <ais-index indexName="instant_search">
            <h2>Related items</h2>

            <ais-configure [searchParameters]="{ hitsPerPage: 4 }"></ais-configure>
            <ais-experimental-configure-related-items
              [hit]="hit"
              [matchingPatterns]="matchingPatterns"
            ></ais-experimental-configure-related-items>

            <div class="related-items">
              <ais-hits>
                <ng-template let-hits="hits">
                  <div class="ais-Hits-list">
                    <div *ngFor="let hit of hits" class="ais-Hits-item">
                      <div class="ais-RelatedHits-item-image">
                        <img [src]="hit.image" [alt]="hit.name" />
                      </div>

                      <div class="ais-RelatedHits-item-title">
                        <h4>{{hit.name}}</h4>
                      </div>
                    </div>
                  </div>
                </ng-template>
              </ais-hits>
            </div>
          </ais-index>
        </div>
      `,
        methods: {
          hit: {
            objectID: '5477500',
            name: 'Amazon - Fire TV Stick with Alexa Voice Remote - Black',
            description:
              'Enjoy smart access to videos, games and apps with this Amazon Fire TV stick. Its Alexa voice remote lets you deliver hands-free commands when you want to watch television or engage with other applications. With a quad-core processor, 1GB internal memory and 8GB of storage, this portable Amazon Fire TV stick works fast for buffer-free streaming.',
            brand: 'Amazon',
            categories: ['TV & Home Theater', 'Streaming Media Players'],
            hierarchicalCategories: {
              lvl0: 'TV & Home Theater',
              lvl1: 'TV & Home Theater > Streaming Media Players',
            },
            type: 'Streaming media plyr',
            price: 39.99,
            price_range: '1 - 50',
            image: 'https://cdn-demo.algolia.com/bestbuy-0118/5477500_sb.jpg',
            url: 'https://api.bestbuy.com/click/-/5477500/pdp',
            free_shipping: false,
            rating: 4,
          },
          matchingPatterns: {
            brand: { score: 3 },
            type: { score: 10 },
            categories: { score: 2 },
          },
        },
      }),
    };
  });
