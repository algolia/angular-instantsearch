import { createRenderer } from '../../../helpers/test-renderer';
import { NgAisHierarchicalMenu } from '../hierarchical-menu';
import { NgAisHierarchicalMenuItem } from '../hierarchical-menu-item';

const defaultState = {
  items: [
    { label: 'one', count: 100, value: 'one' },
    {
      label: 'two',
      count: 100,
      value: 'two',
      isRefined: true,
      data: [
        { label: 'six', count: 100, value: 'six' },
        { label: 'seven', count: 100, value: 'seven' },
        { label: 'eight', count: 100, value: 'eight' },
        { label: 'nine', count: 100, value: 'nine' },
      ],
    },
    { label: 'three', count: 100, value: 'three' },
    { label: 'four', count: 100, value: 'four' },
    { label: 'five', count: 100, value: 'five' },
  ],
  refine: jest.fn(),
  createURL: jest.fn(),
};

describe('HierarchicalMenu', () => {
  it('renders markup without state', () => {
    const render = createRenderer({
      defaultState,
      template: '<ais-hierarchical-menu></ais-hierarchical-menu>',
      TestedWidget: NgAisHierarchicalMenu,
      additionalDeclarations: [NgAisHierarchicalMenuItem],
    });
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it('renders markup with state', () => {
    const render = createRenderer({
      defaultState,
      template: '<ais-hierarchical-menu></ais-hierarchical-menu>',
      TestedWidget: NgAisHierarchicalMenu,
      additionalDeclarations: [NgAisHierarchicalMenuItem],
    });
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });

  it('should call refine() on item click', () => {
    const render = createRenderer({
      defaultState,
      template: '<ais-hierarchical-menu></ais-hierarchical-menu>',
      TestedWidget: NgAisHierarchicalMenu,
      additionalDeclarations: [NgAisHierarchicalMenuItem],
    });
    const refine = jest.fn();
    const fixture = render({ refine });

    const [firstItem] = fixture.debugElement.nativeElement.querySelectorAll(
      'li'
    );
    firstItem.click();

    expect(refine).toHaveBeenCalled();
    expect(refine).toHaveBeenCalledWith(defaultState.items[0].value);
  });

  it('should apply `transformItems` if specified', () => {
    const fixture = render({});

    const mapItems = items =>
      items.map(item => ({
        ...item,
        label: `foo - ${item.label}`,
        data: item.data ? mapItems(item.data) : null,
      }));

    fixture.componentInstance.testedWidget.transformItems = mapItems;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should be hidden with `autoHideContainer`', () => {
    const render = createRenderer({
      defaultState,
      template: '<ais-hierarchical-menu></ais-hierarchical-menu>',
      TestedWidget: NgAisHierarchicalMenu,
      additionalDeclarations: [NgAisHierarchicalMenuItem],
    });
    const fixture = render({ items: [] });
    fixture.componentInstance.testedWidget.autoHideContainer = true;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
