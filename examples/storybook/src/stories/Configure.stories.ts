import { storiesOf } from '@storybook/angular';
import { wrapWithHits } from '../wrap-with-hits';
import meta from '../meta';

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
        searchParameters: { hitsPerPage: 1 },
        toggleSearchParams() {
          (this as any).searchParameters.hitsPerPage =
            (this as any).searchParameters.hitsPerPage === 1 ? 10 : 1;
        },
      },
    }),
  }));
