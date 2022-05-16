import { createRenderer } from '../../../helpers/test-renderer';
import { NgAisRangeSlider } from '../range-slider';

const defaultState = {
  range: { min: 0, max: 200 },
  refine: jest.fn(),
  start: [0, 200],
};

const render = createRenderer({
  defaultState,
  template: '<ais-range-slider></ais-range-slider>',
  TestedWidget: NgAisRangeSlider,
});

describe('RangeSlider', () => {
  it('renders markup without state', () => {
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it('renders markup with state', () => {
    const fixture = render({}, true);
    expect(fixture).toMatchSnapshot();
  });

  it('should call refine() on slider change', () => {
    const refine = jest.fn();
    const fixture = render({ refine }, true);

    fixture.componentInstance.testedWidget.handleChange([10, 50]);

    expect(refine).toHaveBeenCalled();
    expect(refine).toHaveBeenCalledWith([10, 50]);
  });

  it('should create a widget that sets the $$widgetType metadata', () => {
    const createWidget = jest.spyOn(NgAisRangeSlider.prototype, 'createWidget');

    render();

    expect(createWidget).toHaveBeenCalledWith(
      expect.any(Function),
      expect.anything(),
      expect.objectContaining({
        $$widgetType: 'ais.rangeSlider',
      })
    );

    createWidget.mockRestore();
  });
});
