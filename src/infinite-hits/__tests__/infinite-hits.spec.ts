import { createRenderer } from '../../../helpers/test-renderer';
import { NgAisInfiniteHits } from '../infinite-hits';
import { NgAisHighlight } from '../../highlight/highlight';

const defaultState = {
  hits: [
    { name: 'foo', description: 'foo' },
    { name: 'bar', description: 'bar' },
    { name: 'foobar', description: 'foobar' },
    { name: 'barfoo', description: 'barfoo' },
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
});
