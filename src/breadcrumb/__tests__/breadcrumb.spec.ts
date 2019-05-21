import { connectBreadcrumb } from 'instantsearch.js/es/connectors';
import { createRenderer } from '../../../helpers/test-renderer';
import { NgAisBreadcrumb } from '../breadcrumb';

const defaultState = {
  createURL: jest.fn(),
  items: [{ label: 'foo', value: 'foo' }, { label: 'bar', value: 'bar' }],
  refine: jest.fn(),
};

describe('Breadcrumb', () => {
  it('renders markup without state', () => {
    const render = createRenderer({
      defaultState,
      template: '<ais-breadcrumb></ais-breadcrumb>',
      TestedWidget: NgAisBreadcrumb,
    });
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it('renders markup with two items', () => {
    const render = createRenderer({
      defaultState,
      template: '<ais-breadcrumb></ais-breadcrumb>',
      TestedWidget: NgAisBreadcrumb,
    });
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });

  it('should refine when clicking on first item', () => {
    const render = createRenderer({
      defaultState,
      template: '<ais-breadcrumb></ais-breadcrumb>',
      TestedWidget: NgAisBreadcrumb,
    });
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
    const render = createRenderer({
      defaultState,
      template: '<ais-breadcrumb></ais-breadcrumb>',
      TestedWidget: NgAisBreadcrumb,
    });
    const fixture = render({ items: [] });
    fixture.componentInstance.testedWidget.autoHideContainer = true;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should create widget with connectBreadcrumb and pass instance options', () => {
    const createWidget = jest.spyOn(NgAisBreadcrumb.prototype, 'createWidget');

    const attributes = ['attr.lvl1', 'attr.lvl2'];
    const transformItems = jest.fn(x => x);

    const render = createRenderer({
      defaultState,
      template: `
        <ais-breadcrumb 
          [attributes]="attributes"
          rootPath="Audio" 
          separator=" / " 
          [transformItems]="transformItems">
        </ais-breadcrumb>`,
      TestedWidget: NgAisBreadcrumb,
      methods: { transformItems, attributes },
    });

    render({});

    expect(createWidget).toHaveBeenCalledWith(connectBreadcrumb, {
      attributes: ['attr.lvl1', 'attr.lvl2'],
      rootPath: 'Audio',
      separator: ' / ',
      transformItems,
    });

    createWidget.mockRestore();
  });
});
