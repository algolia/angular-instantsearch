import { connectHitsPerPage } from 'instantsearch.js/es/connectors';
import { createRenderer } from '../../../helpers/test-renderer';
import { NgAisHitsPerPage } from '../hits-per-page';

describe('HitsPerPage', () => {
  it('renders markup without state', () => {
    const render = createRenderer({
      defaultState: {
        items: [
          { value: 10, label: '10 per page', isRefined: true },
          { value: 20, label: '20 per page' },
          { value: 30, label: '30 per page' },
        ],
        refine: jest.fn(),
      },
      template: '<ais-hits-per-page></ais-hits-per-page>',
      TestedWidget: NgAisHitsPerPage,
    });
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it('renders markup with state', () => {
    const render = createRenderer({
      defaultState: {
        items: [
          { value: 10, label: '10 per page', isRefined: true },
          { value: 20, label: '20 per page' },
          { value: 30, label: '30 per page' },
        ],
        refine: jest.fn(),
      },
      template: '<ais-hits-per-page></ais-hits-per-page>',
      TestedWidget: NgAisHitsPerPage,
    });
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });

  it('should refine() when selecting another option', () => {
    const render = createRenderer({
      defaultState: {
        items: [
          { value: 10, label: '10 per page', isRefined: true },
          { value: 20, label: '20 per page' },
          { value: 30, label: '30 per page' },
        ],
        refine: jest.fn(),
      },
      template: '<ais-hits-per-page></ais-hits-per-page>',
      TestedWidget: NgAisHitsPerPage,
    });
    const refine = jest.fn();
    const fixture = render({ refine });

    const select = fixture.debugElement.nativeElement.querySelector('select');
    select.value = '20';
    select.dispatchEvent(new Event('change'));

    expect(refine).toHaveBeenCalled();
    expect(refine).toHaveBeenCalledWith('20');
  });

  it('should be hidden with autoHideContainer', () => {
    const render = createRenderer({
      defaultState: {
        items: [
          { value: 10, label: '10 per page', isRefined: true },
          { value: 20, label: '20 per page' },
          { value: 30, label: '30 per page' },
        ],
        refine: jest.fn(),
      },
      template: '<ais-hits-per-page></ais-hits-per-page>',
      TestedWidget: NgAisHitsPerPage,
    });
    const fixture = render();

    fixture.componentInstance.testedWidget.autoHideContainer = true;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should create widget with connectHitsPerPage and pass instance options', () => {
    const createWidget = jest.spyOn(NgAisHitsPerPage.prototype, 'createWidget');
    const items = [
      { value: 10, label: '10 per page', isRefined: true },
      { value: 20, label: '20 per page' },
      { value: 30, label: '30 per page' },
    ];
    const transformItems = jest.fn(x => x);

    const render = createRenderer({
      template:
        '<ais-hits-per-page [items]="items" [transformItems]="transformItems"></ais-hits-per-page>',
      TestedWidget: NgAisHitsPerPage,
      methods: { items, transformItems },
    });

    render();

    expect(createWidget).toHaveBeenCalledWith(connectHitsPerPage, {
      items,
      transformItems,
    });

    createWidget.mockRestore();
  });
});
