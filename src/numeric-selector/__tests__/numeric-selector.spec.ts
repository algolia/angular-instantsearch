import { createRenderer } from '../../../helpers/test-renderer';
import { NgAisNumericSelector } from '../numeric-selector';

const defaultState = {
  currentRefinement: 10,
  options: [
    { label: 'foo', value: 10 },
    { label: 'bar', value: 20 },
    { label: 'foobar', value: 30 },
    { label: 'barfoo', value: 40 },
  ],
  refine: jest.fn(),
};

const render = createRenderer({
  defaultState,
  template: '<ais-numeric-selector></ais-numeric-selector>',
  TestedWidget: NgAisNumericSelector,
});

describe('NumericSelector', () => {
  it('renders markup without state', () => {
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it('renders markup with state', () => {
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });

  it('should call `refine()` on select change', () => {
    const refine = jest.fn();
    const fixture = render({ refine });

    const select = fixture.debugElement.nativeElement.querySelector('select');
    select.value = '20';
    select.dispatchEvent(new Event('change'));

    expect(refine).toHaveBeenCalled();
    expect(refine).toHaveBeenCalledWith('20');
  });
});
