import { createRenderer } from '../../../helpers/test-renderer';
import { NgAisClearRefinements } from '../clear-refinements';

const render = createRenderer({
  defaultState: {},
  template: '<ais-clear-refinements></ais-clear-refinements>',
  TestedWidget: NgAisClearRefinements,
});

describe('ClearRefinements', () => {
  it('renders markup without state', () => {
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it('should render disabled button when no refinements', () => {
    const fixture = render();
    const btn = fixture.debugElement.nativeElement.querySelector('button');
    expect(btn.disabled).toBeTruthy();
  });

  it('should render enabled button when refinements', () => {
    const fixture = render({ hasRefinements: true, refine: jest.fn() });
    const btn = fixture.debugElement.nativeElement.querySelector('button');
    expect(btn.disabled).toBeFalsy();
  });

  it('should call refine() when clicked on button', () => {
    const spy = jest.fn();
    const fixture = render({ hasRefinements: true, refine: spy });

    const btn = fixture.debugElement.nativeElement.querySelector('button');
    btn.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should be hidden with `autoHideContainer`', () => {
    const fixture = render({ hasRefinements: false });
    fixture.componentInstance.testedWidget.autoHideContainer = true;
    fixture.detectChanges();
  });
});
