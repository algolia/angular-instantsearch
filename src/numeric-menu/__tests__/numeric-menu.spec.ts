import { connectNumericMenu } from 'instantsearch.js/es/connectors';
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

describe('NumericRefinementList', () => {
  it('renders markup without state', () => {
    const render = createRenderer({
      defaultState,
      template: '<ais-numeric-menu></ais-numeric-menu>',
      TestedWidget: NgAisNumericMenu,
    });
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it('renders markup with state', () => {
    const render = createRenderer({
      defaultState,
      template: '<ais-numeric-menu></ais-numeric-menu>',
      TestedWidget: NgAisNumericMenu,
    });
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });

  it('should refine() when label click', () => {
    const render = createRenderer({
      defaultState,
      template: '<ais-numeric-menu></ais-numeric-menu>',
      TestedWidget: NgAisNumericMenu,
    });
    const refine = jest.fn();
    const fixture = render({ refine });

    const [, item] = fixture.debugElement.nativeElement.querySelectorAll(
      'label'
    );
    item.click();

    expect(refine).toHaveBeenCalledTimes(1);
    expect(refine).toHaveBeenCalledWith(defaultState.items[1].value);
  });

  it('should not refine() on 2nd label click', () => {
    const render = createRenderer({
      defaultState,
      template: '<ais-numeric-menu></ais-numeric-menu>',
      TestedWidget: NgAisNumericMenu,
    });
    const refine = jest.fn();
    const fixture = render({ refine });

    const [, label] = fixture.debugElement.nativeElement.querySelectorAll(
      'label'
    );
    const [, input] = fixture.debugElement.nativeElement.querySelectorAll(
      'input'
    );

    // Initial state
    expect(refine).not.toHaveBeenCalled();
    expect(input.checked).toEqual(false);

    // 1st click
    label.click();

    expect(refine).toHaveBeenCalledTimes(1);
    expect(input.checked).toEqual(true);

    // 2nd click
    label.click();

    expect(refine).toHaveBeenCalledTimes(1);
    expect(input.checked).toEqual(true);
  });

  it('should check the input of item.isRefined', () => {
    const render = createRenderer({
      defaultState,
      template: '<ais-numeric-menu></ais-numeric-menu>',
      TestedWidget: NgAisNumericMenu,
    });
    const fixture = render({});
    const [
      firstInput,
      secondInput,
    ] = fixture.debugElement.nativeElement.querySelectorAll('input');

    expect(firstInput.checked).toBe(true);
    expect(secondInput.checked).toBe(false);
  });

  it('should be hidden with autoHideContainer', () => {
    const render = createRenderer({
      defaultState,
      template: '<ais-numeric-menu></ais-numeric-menu>',
      TestedWidget: NgAisNumericMenu,
    });
    const fixture = render({ items: [] });
    fixture.componentInstance.testedWidget.autoHideContainer = true;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should create widget with connectNumericMenu and pass instance options', () => {
    const createWidget = jest.spyOn(NgAisNumericMenu.prototype, 'createWidget');

    const items = [
      { label: 'All' },
      { label: 'Less than 500$', end: 500 },
      { label: 'Between 500$ - 1000$', start: 500, end: 1000 },
      { label: 'More than 1000$', start: 1000 },
    ];
    const transformItems = jest.fn(x => x);
    const render = createRenderer({
      defaultState,
      template: `
      <ais-numeric-menu 
        attribute="price" 
        [items]="items" 
        [transformItems]="transformItems"></ais-numeric-menu>`,
      TestedWidget: NgAisNumericMenu,
      methods: { items, transformItems },
    });

    render({});

    expect(createWidget).toHaveBeenCalledTimes(1);
    expect(createWidget).toHaveBeenCalledWith(connectNumericMenu, {
      attribute: 'price',
      items,
      transformItems,
    });

    createWidget.mockRestore();
  });
});
