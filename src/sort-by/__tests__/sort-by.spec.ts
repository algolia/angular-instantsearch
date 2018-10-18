import { createRenderer } from '../../../helpers/test-renderer';
import { NgAisSortBy } from '../sort-by';

const defaultState = {
  currentRefinement: 'foo',
  options: [{ label: 'foo', value: 'foo' }, { label: 'bar', value: 'bar' }],
  refine: jest.fn(),
};

const render = createRenderer({
  defaultState,
  template: '<ais-sort-by></ais-sort-by>',
  TestedWidget: NgAisSortBy,
});

describe('SortBy', () => {
  it('renders markup without state', () => {
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it('renders markup with state', () => {
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });

  it('should call refine on select change', () => {
    const refine = jest.fn();
    const fixture = render({ refine });

    const select = fixture.debugElement.nativeElement.querySelector('select');
    select.value = 'bar';
    select.dispatchEvent(new Event('change'));

    expect(refine).toHaveBeenCalled();
    expect(refine).toHaveBeenCalledWith('bar');
  });
});
