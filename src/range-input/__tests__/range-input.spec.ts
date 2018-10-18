import { createRenderer } from '../../../helpers/test-renderer';
import { NgAisRangeInput } from '../range-input';

const defaultState = {
  range: { min: 0, max: 100 },
  start: [0, 100],
  refine: jest.fn(),
};

const render = createRenderer({
  defaultState,
  template: '<ais-range-input></ais-range-input>',
  TestedWidget: NgAisRangeInput,
});

describe('RangeInput', () => {
  it('renders markup without state', () => {
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it('renders markup with state', () => {
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });

  it('should update `min/max InputValue`', () => {
    const fixture = render({});

    const [
      minInput,
      maxInput,
    ] = fixture.debugElement.nativeElement.querySelectorAll('input');

    minInput.value = '20';
    minInput.dispatchEvent(new Event('change'));

    maxInput.value = '50';
    maxInput.dispatchEvent(new Event('change'));

    expect(fixture.componentInstance.testedWidget.minInputValue).toBe(20);
    expect(fixture.componentInstance.testedWidget.maxInputValue).toBe(50);
  });

  it('should call renfine when submitting form', () => {
    const refine = jest.fn();
    const fixture = render({ refine });

    const [
      minInput,
      maxInput,
    ] = fixture.debugElement.nativeElement.querySelectorAll('input');

    minInput.value = '20';
    minInput.dispatchEvent(new Event('change'));

    maxInput.value = '50';
    maxInput.dispatchEvent(new Event('change'));

    expect(fixture.componentInstance.testedWidget.minInputValue).toBe(20);
    expect(fixture.componentInstance.testedWidget.maxInputValue).toBe(50);

    const submitBtn = fixture.debugElement.nativeElement.querySelector(
      'button'
    );
    submitBtn.click();

    expect(refine).toHaveBeenCalled();
    expect(refine).toHaveBeenCalledWith([20, 50]);
  });
});
