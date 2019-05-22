import { connectHitsWithInsights } from 'instantsearch.js/es/connectors';
import { createRenderer } from '../../../helpers/test-renderer';
import { NgAisHits } from '../hits';
import { NgAisHighlight } from '../../highlight/highlight';

const defaultState = {
  hits: [
    { objectID: '1', name: 'foo', description: 'foo' },
    { objectID: '2', name: 'bar', description: 'bar' },
    { objectID: '3', name: 'foobar', description: 'foobar' },
    { objectID: '4', name: 'barfoo', description: 'barfoo' },
  ],
  results: { nbPages: 50, page: 0, hitsPerPage: 20 },
};

describe('Hits', () => {
  it('renders markup without state', () => {
    const render = createRenderer({
      defaultState,
      template: '<ais-hits></ais-hits>',
      TestedWidget: NgAisHits,
      additionalDeclarations: [NgAisHighlight],
    });
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it('renders markup with state', () => {
    const render = createRenderer({
      defaultState,
      template: '<ais-hits></ais-hits>',
      TestedWidget: NgAisHits,
      additionalDeclarations: [NgAisHighlight],
    });
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });

  it('should create widget with connectHits and pass instance options', () => {
    const createWidget = jest.spyOn(NgAisHits.prototype, 'createWidget');

    const transformItems = jest.fn(x => x);
    const render = createRenderer({
      defaultState,
      template:
        '<ais-hits [escapeHTML]="false" [transformItems]="transformItems"></ais-hits>',
      TestedWidget: NgAisHits,
      additionalDeclarations: [NgAisHighlight],
      methods: { transformItems },
    });

    render({});

    expect(createWidget).toHaveBeenCalledWith(connectHitsWithInsights, {
      escapeHTML: false,
      transformItems,
    });
    createWidget.mockRestore();
  });

  it('should expose hits to the passed template', () => {
    const render = createRenderer({
      defaultState,
      template: `
          <ais-hits>
            <ng-template let-hits="hits">
              <ul>
                <li *ngFor="let hit of hits">
                  {{hit.name}}
                </li>
              </ul>
            </ng-template>
          </ais-hits>
        `,
      TestedWidget: NgAisHits,
      additionalDeclarations: [NgAisHighlight],
    });
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });

  it('should expose results to the passed template', () => {
    const render = createRenderer({
      defaultState,
      template: `
          <ais-hits>
            <ng-template let-results="results">
              {{ results | json }}
            </ng-template>
          </ais-hits>
        `,
      TestedWidget: NgAisHits,
      additionalDeclarations: [NgAisHighlight],
    });
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });
  it('should allow calling insightsClient', () => {
    const render = createRenderer({
      defaultState,
      template: `
          <ais-hits>
            <ng-template let-hits="hits" let-insights="insights">
              <ul>
                <li *ngFor="let hit of hits">
                  <button 
                    id="add-to-cart-{{hit.objectID}}" 
                    (click)="insights('clickedObjectIDsAfterSearch', { eventName: 'Add to cart', objectIDs: [hit.objectID] })">
                    
                  </button>
                </li>
              </ul>
            </ng-template>
          </ais-hits>
        `,
      TestedWidget: NgAisHits,
      additionalDeclarations: [NgAisHighlight],
    });

    const insights = jest.fn();
    const fixture = render({ insights });

    const button = fixture.debugElement.nativeElement.querySelector(
      '#add-to-cart-2'
    );
    button.click();

    expect(insights).toHaveBeenCalledWith('clickedObjectIDsAfterSearch', {
      eventName: 'Add to cart',
      objectIDs: ['2'],
    });
  });
});
