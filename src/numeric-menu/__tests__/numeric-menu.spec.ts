import { createRenderer } from '../../../helpers/test-renderer';
import { NgAisNumericMenu } from '../numeric-menu';

const defaultState = {
  createURL: jest.fn(),
  items: [
    { label: '10', value: '10', isRefined: true },
    { label: '20', value: '20' },
  ],
  refine: jest.fn(),
};

const render = createRenderer({
  defaultState,
  template: '<ais-numeric-menu></ais-numeric-menu>',
  TestedWidget: NgAisNumericMenu,
});

describe('NumericRefinementList', () => {
  it('renders markup without state', () => {
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it('renders markup with state', () => {
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });

  it('should refine() when label click', () => {
    const refine = jest.fn();
    const fixture = render({ refine });

    const [, item] = fixture.debugElement.nativeElement.querySelectorAll(
      'label'
    );
    item.click();

    expect(refine).toHaveBeenCalledTimes(1);
    expect(refine).toHaveBeenCalledWith(defaultState.items[1].value);
  });

  it('should check the input of item.isRefined', () => {
    const fixture = render({});
    const [
      firstInput,
      secondInput,
    ] = fixture.debugElement.nativeElement.querySelectorAll('input');

    expect(firstInput.checked).toBe(true);
    expect(secondInput.checked).toBe(false);
  });

  it('should be hidden with autoHideContainer', () => {
    const fixture = render({ items: [] });
    fixture.componentInstance.testedWidget.autoHideContainer = true;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
