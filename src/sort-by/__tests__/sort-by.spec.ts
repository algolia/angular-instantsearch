import { connectSortBy } from 'instantsearch.js/es/connectors';
import { createRenderer } from '../../../helpers/test-renderer';
import { NgAisSortBy } from '../sort-by';

const defaultState = {
  currentRefinement: 'foo',
  options: [{ label: 'foo', value: 'foo' }, { label: 'bar', value: 'bar' }],
  refine: jest.fn(),
};

describe('SortBy', () => {
  it('renders markup without state', () => {
    const render = createRenderer({
      defaultState,
      template: '<ais-sort-by></ais-sort-by>',
      TestedWidget: NgAisSortBy,
    });
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it('renders markup with state', () => {
    const render = createRenderer({
      defaultState,
      template: '<ais-sort-by></ais-sort-by>',
      TestedWidget: NgAisSortBy,
    });
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });

  it('should call refine on select change', () => {
    const render = createRenderer({
      defaultState,
      template: '<ais-sort-by></ais-sort-by>',
      TestedWidget: NgAisSortBy,
    });
    const refine = jest.fn();
    const fixture = render({ refine });

    const select = fixture.debugElement.nativeElement.querySelector('select');
    select.value = 'bar';
    select.dispatchEvent(new Event('change'));

    expect(refine).toHaveBeenCalled();
    expect(refine).toHaveBeenCalledWith('bar');
  });

  it('should create widget with connectSortBy and pass instance options', () => {
    const createWidget = jest.spyOn(NgAisSortBy.prototype, 'createWidget');
    const items = [
      { label: 'foo', value: 'foo' },
      { label: 'bar', value: 'bar' },
    ];
    const transformItems = jest.fn(x => x);
    const render = createRenderer({
      defaultState,
      template:
        '<ais-sort-by [items]="items" [transformItems]="transformItems"></ais-sort-by>',
      TestedWidget: NgAisSortBy,
      methods: { items, transformItems },
    });

    render();

    expect(createWidget).toHaveBeenCalledTimes(1);
    expect(createWidget).toHaveBeenCalledWith(connectSortBy, {
      items,
      transformItems,
    });
    createWidget.mockRestore();
  });
});
