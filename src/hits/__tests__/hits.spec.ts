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

  it('should apply `transformItems` if specified', () => {
    const render = createRenderer({
      defaultState,
      template: '<ais-hits></ais-hits>',
      TestedWidget: NgAisHits,
      additionalDeclarations: [NgAisHighlight],
    });
    const fixture = render({});
    fixture.componentInstance.testedWidget.transformItems = items =>
      items.map(item => ({ ...item, name: `transformed - ${item.name}` }));
    fixture.componentInstance.testedWidget.updateState(defaultState, false);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
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
});
