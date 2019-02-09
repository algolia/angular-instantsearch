import { createRenderer } from '../../../helpers/test-renderer';
import { NgAisCurrentRefinements } from '../current-refinements';

import { bem } from '../../utils';

const cx = bem('CurrentRefinements');

const defaultState = {
  createURL: jest.fn(),
  refine: jest.fn(),
  items: [
    {
      attribute: 'brand',
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

const render = createRenderer({
  defaultState,
  template: '<ais-current-refinements></ais-current-refinements>',
  TestedWidget: NgAisCurrentRefinements,
});

describe('CurrentRefinedValues', () => {
  it('renders markup without state', () => {
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it('renders markup with state', () => {
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });

  it('should call refine() when clicking on an refined element', () => {
    const refine = jest.fn();
    const fixture = render({ refine });

    const [firstEl] = fixture.debugElement.nativeElement.querySelectorAll(
      'span > button'
    );
    firstEl.click();

    expect(refine).toHaveBeenCalled();
    expect(refine).toHaveBeenCalledWith(defaultState.items[0].refinements[0]);
  });

  it('should apply `transformItems` if specified', () => {
    const fixture = render({});

    fixture.componentInstance.testedWidget.transformItems = items =>
      items.map(item => ({
        ...item,
        computedLabel: `foo - ${item.computedLabel}`,
      }));
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
  //
  // it('should be hidden with `autoHideContainer`', () => {
  //   const fixture = render({ refinements: [] });
  //   fixture.componentInstance.testedWidget.autoHideContainer = true;
  //   fixture.detectChanges();
  //
  //   expect(fixture).toMatchSnapshot();
  // });
});
