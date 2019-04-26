import { createRenderer } from '../../../helpers/test-renderer';
import { NgAisInfiniteHits } from '../infinite-hits';
import { NgAisHighlight } from '../../highlight/highlight';

const defaultState = {
  hits: [
    { objectID: '1', name: 'foo', description: 'foo' },
    { objectID: '2', name: 'bar', description: 'bar' },
    { objectID: '3', name: 'foobar', description: 'foobar' },
    { objectID: '4', name: 'barfoo', description: 'barfoo' },
  ],
  showMore: jest.fn(),
  isLastPage: false,
};

const render = createRenderer({
  defaultState,
  template: '<ais-infinite-hits></ais-infinite-hits>',
  TestedWidget: NgAisInfiniteHits,
  additionalDeclarations: [NgAisHighlight],
});

describe('InfiniteHits', () => {
  it('renders markup without state', () => {
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it('renders markup with state', () => {
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });

  it('should call `showMore()` on button click', () => {
    const showMore = jest.fn();
    const fixture = render({ showMore });

    const button = fixture.debugElement.nativeElement.querySelector(
      '.ais-InfiniteHits-loadMore'
    );
    button.click();

    expect(button.disabled).toEqual(false);
    expect(showMore).toHaveBeenCalled();
  });

  it('should disable `showMore` button', () => {
    const showMore = jest.fn();
    const fixture = render({ showMore, isLastPage: true });

    const button = fixture.debugElement.nativeElement.querySelector(
      '.ais-InfiniteHits-loadMore'
    );
    button.click();

    expect(button.disabled).toEqual(true);
    expect(showMore).not.toHaveBeenCalled();
    expect(fixture).toMatchSnapshot();
  });

  it('should display `showPrevious()` button', () => {
    const showPrevious = jest.fn();
    const renderWithPrevious = createRenderer({
      defaultState,
      template: '<ais-infinite-hits [showPrevious]=true></ais-infinite-hits>',
      TestedWidget: NgAisInfiniteHits,
      additionalDeclarations: [NgAisHighlight],
    });
    const fixture = renderWithPrevious({ showPrevious });

    const button = fixture.debugElement.nativeElement.querySelector(
      '.ais-InfiniteHits-loadPrevious'
    );

    expect(button).toBeTruthy();
  });

  it('should display `showPrevious()` button with custom label', () => {
    const showPrevious = jest.fn();
    const renderWithPrevious = createRenderer({
      defaultState,
      template:
        '<ais-infinite-hits [showPrevious]=true showPreviousLabel="Load previous"></ais-infinite-hits>',
      TestedWidget: NgAisInfiniteHits,
      additionalDeclarations: [NgAisHighlight],
    });
    const fixture = renderWithPrevious({ showPrevious });

    const button = fixture.debugElement.nativeElement.querySelector(
      '.ais-InfiniteHits-loadPrevious'
    );

    expect(button.innerHTML).toMatchInlineSnapshot(`" Load previous "`);
  });

  it('should call `showPrevious()` on button click', () => {
    const showPrevious = jest.fn();
    const renderWithPrevious = createRenderer({
      defaultState,
      template: '<ais-infinite-hits [showPrevious]=true></ais-infinite-hits>',
      TestedWidget: NgAisInfiniteHits,
      additionalDeclarations: [NgAisHighlight],
    });
    const fixture = renderWithPrevious({ showPrevious });

    const button = fixture.debugElement.nativeElement.querySelector(
      '.ais-InfiniteHits-loadPrevious'
    );
    button.click();

    expect(button.disabled).toEqual(false);
    expect(showPrevious).toHaveBeenCalledTimes(1);
  });

  it('should disable `showPrevious` button on first page', () => {
    const showPrevious = jest.fn();
    const renderWithPrevious = createRenderer({
      defaultState,
      template: '<ais-infinite-hits [showPrevious]=true></ais-infinite-hits>',
      TestedWidget: NgAisInfiniteHits,
      additionalDeclarations: [NgAisHighlight],
    });
    const fixture = renderWithPrevious({ showPrevious, isFirstPage: true });

    const button = fixture.debugElement.nativeElement.querySelector(
      '.ais-InfiniteHits-loadPrevious'
    );

    expect(button.className).toMatchInlineSnapshot(
      `"ais-InfiniteHits-loadPrevious ais-InfiniteHits-loadPrevious--disabled"`
    );
    expect(button.disabled).toEqual(true);
    expect(showPrevious).toHaveBeenCalledTimes(0);
    expect(fixture).toMatchSnapshot();
  });

  it('should render with custom templates', () => {
    const renderWithCustomTemplate = createRenderer({
      defaultState,
      template: `
        <ais-infinite-hits>
          <ng-template
            let-hits="hits"
            let-showMore="showMore"
            let-showPrevious="showPrevious"
            let-isFirstPage="isFirstPage"
            let-isLastPage="isLastPage"
          >
            <button (click)="showPrevious()" [disabled]="isFirstPage">Load previous</button>
            <div *ngFor="let hit of hits">
              <strong>{{hit.name}}</strong>
            </div>
            <button (click)="showMore()" [disabled]="isLastPage">Load more</button>
          </ng-template>
        </ais-infinite-hits>
      `,
      TestedWidget: NgAisInfiniteHits,
      additionalDeclarations: [NgAisHighlight],
    });
    const fixture = renderWithCustomTemplate({});

    expect(fixture).toMatchSnapshot();
  });

  it('should allow calling insightsClient', () => {
    const renderWithCustomTemplate = createRenderer({
      defaultState,
      template: `
        <ais-infinite-hits>
          <ng-template
            let-hits="hits"
            let-insights="insights"
          >
            <ul>
              <li *ngFor="let hit of hits">
                <button 
                  id="add-to-cart-{{hit.objectID}}" 
                  (click)="insights('clickedObjectIDsAfterSearch', { eventName: 'Add to cart', objectIDs: [hit.objectID] })">
                  
                </button>
              </li>
            </ul>
          </ng-template>
        </ais-infinite-hits>
      `,
      TestedWidget: NgAisInfiniteHits,
      additionalDeclarations: [NgAisHighlight],
    });
    const insights = jest.fn();
    const fixture = renderWithCustomTemplate({ insights });
    expect(fixture).toMatchSnapshot();

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
