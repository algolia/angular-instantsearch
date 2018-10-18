import { createRenderer } from '../../../helpers/test-renderer';
import { NgAisSearchBox } from '../search-box';

const defaultState = {
  query: 'foo',
  refine: jest.fn(),
};

const render = createRenderer({
  defaultState,
  template: '<ais-search-box></ais-search-box>',
  TestedWidget: NgAisSearchBox,
});

describe('SearchBox', () => {
  it('renders markup without state', () => {
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it('renders markup with state', () => {
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });

  describe('[autofocus]', () => {
    it('should set focus on init when true', () => {
      const fixture = createRenderer({
        defaultState,
        template: "<ais-search-box [autofocus]='true'></ais-search-box>",
        TestedWidget: NgAisSearchBox,
      })();
      const widget = fixture.componentInstance.testedWidget;
      expect(document.activeElement).toBe(widget.searchBox.nativeElement);
    });
    it('should not set focus on init when false', () => {
      const fixture = createRenderer({
        defaultState,
        template: "<ais-search-box [autofocus]='false'></ais-search-box>",
        TestedWidget: NgAisSearchBox,
      })();
      const widget = fixture.componentInstance.testedWidget;
      expect(document.activeElement).not.toBe(widget.searchBox.nativeElement);
    });
  });
});
