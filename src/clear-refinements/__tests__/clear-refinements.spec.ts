import { connectClearRefinements } from 'instantsearch.js/es/connectors';
import { createRenderer } from '../../../helpers/test-renderer';
import { NgAisClearRefinements } from '../clear-refinements';

describe('ClearRefinements', () => {
  it('renders markup without state', () => {
    const render = createRenderer({
      defaultState: {},
      template: '<ais-clear-refinements></ais-clear-refinements>',
      TestedWidget: NgAisClearRefinements,
    });
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it('should render disabled button when no refinements', () => {
    const render = createRenderer({
      defaultState: {},
      template: '<ais-clear-refinements></ais-clear-refinements>',
      TestedWidget: NgAisClearRefinements,
    });
    const fixture = render();
    const btn = fixture.debugElement.nativeElement.querySelector('button');
    expect(btn.disabled).toBeTruthy();
  });

  it('should render enabled button when refinements', () => {
    const render = createRenderer({
      defaultState: {},
      template: '<ais-clear-refinements></ais-clear-refinements>',
      TestedWidget: NgAisClearRefinements,
    });
    const fixture = render({ hasRefinements: true, refine: jest.fn() });
    const btn = fixture.debugElement.nativeElement.querySelector('button');
    expect(btn.disabled).toBeFalsy();
  });

  it('should call refine() when clicked on button', () => {
    const render = createRenderer({
      defaultState: {},
      template: '<ais-clear-refinements></ais-clear-refinements>',
      TestedWidget: NgAisClearRefinements,
    });
    const spy = jest.fn();
    const fixture = render({ hasRefinements: true, refine: spy });

    const btn = fixture.debugElement.nativeElement.querySelector('button');
    btn.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should be hidden with `autoHideContainer`', () => {
    const render = createRenderer({
      defaultState: {},
      template: '<ais-clear-refinements></ais-clear-refinements>',
      TestedWidget: NgAisClearRefinements,
    });
    const fixture = render({ hasRefinements: false });
    fixture.componentInstance.testedWidget.autoHideContainer = true;
    fixture.detectChanges();
  });

  it('should create widget with connectClearRefinements and pass instance options', () => {
    const createWidget = jest.spyOn(
      NgAisClearRefinements.prototype,
      'createWidget'
    );
    const includedAttributes = ['query'];
    const excludedAttributes = ['brand'];
    const transformItems = jest.fn(x => x);

    const render = createRenderer({
      defaultState: {},
      template: `<ais-clear-refinements 
        [includedAttributes]="includedAttributes" 
        [excludedAttributes]="excludedAttributes"
        [transformItems]="transformItems">
       </ais-clear-refinements>`,
      TestedWidget: NgAisClearRefinements,
      methods: {
        includedAttributes,
        excludedAttributes,
        transformItems,
      },
    });

    render();

    expect(createWidget).toHaveBeenCalledTimes(1);
    expect(createWidget).toHaveBeenCalledWith(connectClearRefinements, {
      includedAttributes,
      excludedAttributes,
      transformItems,
    });

    createWidget.mockRestore();
  });
});
