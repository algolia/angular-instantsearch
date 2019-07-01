import { createRenderer } from '../../../helpers/test-renderer';
import { NgAisRangeInput } from '../range-input';

const defaultState = {
  range: { min: 0, max: 100 },
  start: [0, 100],
  refine: jest.fn(),
};

describe('RangeInput', () => {
  it('renders markup without state', () => {
    const render = createRenderer({
      defaultState,
      template: '<ais-range-input></ais-range-input>',
      TestedWidget: NgAisRangeInput,
    });
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it('renders markup with state', () => {
    const render = createRenderer({
      defaultState,
      template: '<ais-range-input></ais-range-input>',
      TestedWidget: NgAisRangeInput,
    });
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });

  it('should update `min/max InputValue`', () => {
    const render = createRenderer({
      defaultState,
      template: '<ais-range-input></ais-range-input>',
      TestedWidget: NgAisRangeInput,
    });
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

  it('should call refine when submitting form', () => {
    const render = createRenderer({
      defaultState,
      template: '<ais-range-input></ais-range-input>',
      TestedWidget: NgAisRangeInput,
    });
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

  it('should apply precision of 0 by default', () => {
    const render = createRenderer({
      defaultState,
      template: '<ais-range-input></ais-range-input>',
      TestedWidget: NgAisRangeInput,
    });
    const fixture = render();
    expect(fixture.componentInstance.testedWidget.step).toEqual(1);
  });

  it('should allow precision of 0', () => {
    const render = createRenderer({
      defaultState,
      template: '<ais-range-input precision="0"></ais-range-input>',
      TestedWidget: NgAisRangeInput,
    });
    const fixture = render();
    expect(fixture.componentInstance.testedWidget.step).toEqual(1);
  });

  it('should allow precision of 1', () => {
    const render = createRenderer({
      defaultState,
      template: '<ais-range-input precision="1"></ais-range-input>',
      TestedWidget: NgAisRangeInput,
    });
    const fixture = render();
    expect(fixture.componentInstance.testedWidget.step).toEqual(0.1);
  });

  it('should allow precision of -2', () => {
    const render = createRenderer({
      defaultState,
      template: '<ais-range-input precision="-2"></ais-range-input>',
      TestedWidget: NgAisRangeInput,
    });
    const fixture = render();
    expect(fixture.componentInstance.testedWidget.step).toEqual(100);
  });

  it('should use ais-RangeInput--noRefinement when min === max', () => {
    const render = createRenderer({
      defaultState,
      template: '<ais-range-input></ais-range-input>',
      TestedWidget: NgAisRangeInput,
    });
    const fixture = render({
      range: { min: 0, max: 0 },
      start: [0, 100],
      refine: jest.fn(),
    });
    expect(fixture).toMatchSnapshot();
    expect(
      fixture.debugElement.nativeElement.querySelector(
        'ais-range-input > .ais-RangeInput--noRefinement'
      )
    ).toBeTruthy();
  });

  it('should not use ais-RangeInput--noRefinement when min < max', () => {
    const render = createRenderer({
      defaultState,
      template: '<ais-range-input></ais-range-input>',
      TestedWidget: NgAisRangeInput,
    });
    const fixture = render({
      range: { min: 0, max: 100 },
      start: [0, 100],
      refine: jest.fn(),
    });
    expect(fixture).toMatchSnapshot();
    expect(
      fixture.debugElement.nativeElement.querySelector(
        'ais-range-input > .ais-RangeInput--noRefinement'
      )
    ).toBeFalsy();
  });
});
