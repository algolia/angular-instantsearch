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

      it('should not call refine as you user is typing', () => {
        expect(refine).toHaveBeenCalledTimes(0);
      });

      it('should call refine when submit button has been clicked', () => {
        const submitButton = fixture.debugElement.query(
          By.css('button[type="submit"]')
        );
        submitButton.nativeElement.dispatchEvent(new Event('click'));

        expect(refine).toHaveBeenCalledTimes(1);
        expect(refine).toHaveBeenCalledWith('the query');
      });

      it('should call refine when Form has been submit', () => {
        const form = fixture.debugElement.query(By.css('form'));
        form.nativeElement.dispatchEvent(new Event('submit'));

        expect(refine).toHaveBeenCalledTimes(1);
        expect(refine).toHaveBeenCalledWith('the query');
      });
    });
  });
});
