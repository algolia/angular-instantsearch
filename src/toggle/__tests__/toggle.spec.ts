import { createRenderer } from '../../../helpers/test-renderer';
import { NgAisToggle } from '../toggle';

const defaultState = {
  createURL: jest.fn(),
  refine: jest.fn(),
  value: {
    isRefined: true,
    name: 'foobar',
    count: 666,
  },
};

const render = createRenderer({
  defaultState,
  template: '<ais-toggle></ais-toggle>',
  TestedWidget: NgAisToggle,
});

describe('Toggle', () => {
  it('should render without state', () => {
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it('should render with state', () => {
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });

  it('should render with a label', () => {
    const fixture = render({});
    fixture.componentInstance.testedWidget.label = 'Foo Label';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should call refine on click', () => {
    const refine = jest.fn();
    const fixture = render({ refine });

    const toggle = fixture.debugElement.nativeElement.querySelector('label');
    toggle.click();

    expect(refine).toHaveBeenCalledTimes(1);
    expect(refine).toHaveBeenCalledWith(defaultState.value);
  });
});
