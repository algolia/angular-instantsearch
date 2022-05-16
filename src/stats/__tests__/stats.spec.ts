import { createRenderer } from '../../../helpers/test-renderer';
import { NgAisStats } from '../stats';

const render = createRenderer({
  defaultState: {
    hitPerPage: 20,
    nbHits: 100,
    nbPages: 5,
    page: 0,
    processingTimeMS: 123,
    query: 'foobar',
  },
  template: '<ais-stats></ais-stats>',
  TestedWidget: NgAisStats,
});

describe('Stats', () => {
  it('should render without state', () => {
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it('should render with state', () => {
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });

  it('should create a widget that sets the $$widgetType metadata', () => {
    const createWidget = jest.spyOn(NgAisStats.prototype, 'createWidget');

    render();

    expect(createWidget).toHaveBeenCalledWith(
      expect.any(Function),
      expect.anything(),
      expect.objectContaining({
        $$widgetType: 'ais.stats',
      })
    );

    createWidget.mockRestore();
  });
});
