import { createRenderer } from '../../../helpers/test-renderer';
import { NgAisBreadcrumb } from '../breadcrumb';

const defaultState = {
  createURL: jest.fn(),
  items: [{ name: 'foo', value: 'foo' }, { name: 'bar', value: 'bar' }],
  refine: jest.fn(),
};

const render = createRenderer({
  defaultState,
  template: '<ais-breadcrumb></ais-breadcrumb>',
  TestedWidget: NgAisBreadcrumb,
});

describe('Breadcrumb', () => {
  it('renders markup without state', () => {
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it('renders markup with two items', () => {
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });

  it('should refine when clicking on first item', () => {
    const refine = jest.fn();
    const fixture = render({ refine });

    const firstLink = fixture.debugElement.nativeElement.querySelector(
      'a:first-child'
    );

    firstLink.click();

    expect(refine).toHaveBeenCalled();
    expect(refine).toHaveBeenCalledWith('foo');
  });

  it('should be hidden with `autoHideContainer`', () => {
    const fixture = render({ items: [] });
    fixture.componentInstance.testedWidget.autoHideContainer = true;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
