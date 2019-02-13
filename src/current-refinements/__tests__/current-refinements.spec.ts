import { createRenderer } from '../../../helpers/test-renderer';
import { connectCurrentRefinements } from 'instantsearch.js/es/connectors';
import { NgAisCurrentRefinements } from '../current-refinements';

const defaultState = {
  createURL: jest.fn(),
  refine: jest.fn(),
  items: [
    {
      attribute: 'brand',
      label: 'brand',
      refine: jest.fn(),
      refinements: [
        {
          type: 'disjunctive',
          count: 27,
          exhaustive: true,
          label: 'Canon',
        },
        {
          type: 'disjunctive',
          count: 28,
          exhaustive: true,
          label: 'Sony',
        },
      ],
    },
    {
      attribute: 'hierarchicalCategories.lvl0',
      label: 'hierarchicalCategories.lvl0',
      refine: jest.fn(),
      refinements: [
        {
          type: 'hierarchical',
          attribute: 'hierarchicalCategories.lvl0',
          count: 55,
          label: 'Cameras & Camcorders',
        },
      ],
    },
    {
      attribute: 'popularity',
      label: 'popularity',
      refine: jest.fn(),
      refinements: [
        {
          attribute: 'popularity',
          type: 'numeric',
          numericValue: 0,
          operator: '>=',
          label: '≥ 0',
        },
      ],
    },
  ],
};

const render = template =>
  createRenderer({
    defaultState,
    template,
    TestedWidget: NgAisCurrentRefinements,
  });

describe('CurrentRefinedValues', () => {
  it('renders markup without state', () => {
    const fixture = render(
      '<ais-current-refinements></ais-current-refinements>'
    )();
    expect(fixture).toMatchSnapshot();
  });

  it('renders markup with state', () => {
    const fixture = render(
      '<ais-current-refinements></ais-current-refinements>'
    )({});
    expect(fixture).toMatchSnapshot();
  });

  it('should call refine() when clicking on an refined element', () => {
    const refine = jest.fn();
    const fixture = render(
      '<ais-current-refinements></ais-current-refinements>'
    )({ refine });

    const [firstEl] = fixture.debugElement.nativeElement.querySelectorAll(
      'span > button'
    );
    firstEl.click();

    expect(refine).toHaveBeenCalledTimes(1);
    expect(refine).toHaveBeenCalledWith(defaultState.items[0].refinements[0]);
  });

  it('should pass over [includedAttributes]', () => {
    const createWidget = jest.spyOn(
      NgAisCurrentRefinements.prototype,
      'createWidget'
    );

    render(
      `<ais-current-refinements [includedAttributes]="['query']"></ais-current-refinements>`
    )({});

    expect(createWidget).toHaveBeenCalledTimes(1);
    expect(createWidget).toHaveBeenLastCalledWith(
      connectCurrentRefinements,
      expect.objectContaining({ includedAttributes: ['query'] })
    );
    createWidget.mockRestore();
  });

  it('should pass over [excludedAttributes]', () => {
    const createWidget = jest.spyOn(
      NgAisCurrentRefinements.prototype,
      'createWidget'
    );

    render(
      `<ais-current-refinements [excludedAttributes]="['brands']"></ais-current-refinements>`
    )({});

    expect(createWidget).toHaveBeenCalledTimes(1);
    expect(createWidget).toHaveBeenLastCalledWith(
      connectCurrentRefinements,
      expect.objectContaining({ excludedAttributes: ['brands'] })
    );
    createWidget.mockRestore();
  });

  it('should pass over [transformItems] if specified', () => {
    const createWidget = jest.spyOn(
      NgAisCurrentRefinements.prototype,
      'createWidget'
    );

    render(
      `<ais-current-refinements [transformItems]="'func'"></ais-current-refinements>`
    )({});

    expect(createWidget).toHaveBeenCalledTimes(1);
    expect(createWidget).toHaveBeenLastCalledWith(
      connectCurrentRefinements,
      expect.objectContaining({ transformItems: 'func' })
    );
    createWidget.mockRestore();
  });

  it('should be hidden with `autoHideContainer`', () => {
    const fixture = render(
      '<ais-current-refinements></ais-current-refinements>'
    )({});
    fixture.componentInstance.testedWidget.autoHideContainer = true;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
