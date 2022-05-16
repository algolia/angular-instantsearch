import { createRenderer } from '../../../helpers/test-renderer';
import { NgAisConfigureRelatedItems } from '../configure-related-items';

describe('ConfigureRelatedItems', () => {
  it('renders markup', () => {
    const render = createRenderer({
      TestedWidget: NgAisConfigureRelatedItems,
      template:
        '<ais-experimental-configure-related-items></ais-experimental-configure-related-items>',
    });

    const fixture = render();

    expect(fixture).toMatchSnapshot();
  });

  it('forwards options', () => {
    const createWidget = jest.spyOn(
      NgAisConfigureRelatedItems.prototype,
      'createWidget'
    );
    const hit = {};
    const matchingPatterns = {};
    const transformSearchParameters = jest.fn();

    const render = createRenderer({
      TestedWidget: NgAisConfigureRelatedItems,
      template: `
      <ais-experimental-configure-related-items
        [hit]="hit"
        [matchingPatterns]="matchingPatterns"
        [transformSearchParameters]="transformSearchParameters"
      ></ais-experimental-configure-related-items>`,
      methods: {
        hit,
        matchingPatterns,
        transformSearchParameters,
      },
    });

    render();

    expect(createWidget.mock.calls[0][1]).toEqual({
      hit,
      matchingPatterns,
      transformSearchParameters,
    });
  });

  it('should create a widget that sets the $$widgetType metadata', () => {
    const createWidget = jest.spyOn(
      NgAisConfigureRelatedItems.prototype,
      'createWidget'
    );

    const render = createRenderer({
      TestedWidget: NgAisConfigureRelatedItems,
      template:
        '<ais-experimental-configure-related-items></ais-experimental-configure-related-items>',
    });
    render();

    expect(createWidget).toHaveBeenCalledWith(
      expect.any(Function),
      expect.anything(),
      expect.objectContaining({
        $$widgetType: 'ais.configureRelatedItems',
      })
    );

    createWidget.mockRestore();
  });
});
