import { createRenderer } from '../../../helpers/test-renderer';
import { NgAisSearchBox } from '../search-box';
import { By } from '@angular/platform-browser';

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

  describe('[searchAsYouType]', () => {
    describe('default behaviour', () => {
      it('should call refine as you type by default', () => {
        const fixture = createRenderer({
          defaultState,
          template: '<ais-search-box></ais-search-box>',
          TestedWidget: NgAisSearchBox,
        })();
        const widget = fixture.componentInstance.testedWidget;
        const refine = jest.spyOn(widget.state, 'refine');

        const searchBox = widget.searchBox.nativeElement;
        searchBox.value = 'the query';
        searchBox.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(refine).toHaveBeenCalledTimes(1);
        expect(refine).toHaveBeenCalledWith('the query');
      });

      it('should not update query when out of sync and input is focused', () => {
        const fixture = createRenderer({
          defaultState,
          template: '<ais-search-box></ais-search-box>',
          TestedWidget: NgAisSearchBox,
        })();
        const widget = fixture.componentInstance.testedWidget;

        const searchBox = widget.searchBox.nativeElement;
        searchBox.focus();
        searchBox.value = 'hello';
        searchBox.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(searchBox.value).toEqual('hello');

        widget.state.query = 'hel';
        fixture.detectChanges();
        expect(searchBox.value).toEqual('hello');

        searchBox.blur();
        widget.state.query = 'world';
        fixture.detectChanges();
        expect(searchBox.value).toEqual('world');
      });
    });

    describe('[searchAsYouType]="false"', () => {
      let fixture;
      let refine;

      beforeEach(() => {
        fixture = createRenderer({
          defaultState,
          template:
            '<ais-search-box [searchAsYouType]="false"></ais-search-box>',
          TestedWidget: NgAisSearchBox,
        })();
        const widget = fixture.componentInstance.testedWidget;
        refine = jest.spyOn(widget.state, 'refine');

        const searchBox = widget.searchBox.nativeElement;
        searchBox.value = 'the query';
        searchBox.dispatchEvent(new Event('input'));
      });

      it('should not call refine on each keystroke', () => {
        expect(refine).toHaveBeenCalledTimes(0);
      });

      it('should call refine when the form is submitted', () => {
        const form = fixture.debugElement.query(By.css('form'));
        form.nativeElement.dispatchEvent(new Event('submit'));

        expect(refine).toHaveBeenCalledTimes(1);
        expect(refine).toHaveBeenCalledWith('the query');
      });
    });
  });

  describe('[showLoadingIndicator]', () => {
    it('should show a loading indicator by default when search is stalled', () => {
      const fixture = createRenderer({
        defaultState,
        template: '<ais-search-box></ais-search-box>',
        TestedWidget: NgAisSearchBox,
      })();
      const widget = fixture.componentInstance.testedWidget;
      widget.state.isSearchStalled = true;
      fixture.detectChanges();

      const loadingIndicator = fixture.debugElement.query(
        By.css('.ais-SearchBox-loadingIndicator')
      );
      expect(loadingIndicator.nativeElement.hidden).toBe(false);
    });

    it('should not show a loading indicator when property is false', () => {
      const fixture = createRenderer({
        defaultState,
        template:
          '<ais-search-box [showLoadingIndicator]="false"></ais-search-box>',
        TestedWidget: NgAisSearchBox,
      })();
      const widget = fixture.componentInstance.testedWidget;
      widget.state.isSearchStalled = true;
      fixture.detectChanges();

      const loadingIndicator = fixture.debugElement.query(
        By.css('.ais-SearchBox-loadingIndicator')
      );
      expect(loadingIndicator.nativeElement.hidden).toBe(true);
    });
  });

  it('should create a widget that sets the $$widgetType metadata', () => {
    const createWidget = jest.spyOn(NgAisSearchBox.prototype, 'createWidget');

    const render = createRenderer({
      TestedWidget: NgAisSearchBox,
      template: '<ais-search-box></ais-search-box>',
    });
    render();

    expect(createWidget).toHaveBeenCalledWith(
      expect.any(Function),
      expect.anything(),
      expect.objectContaining({
        $$widgetType: 'ais.searchBox',
      })
    );

    createWidget.mockRestore();
  });
});
