import { NgAisIndex } from '../index-widget';
import { NgAisSearchBox } from '../../search-box/search-box';
import { createRenderer } from '../../../helpers/test-renderer.nomock';

describe('Index', () => {
  it('adds index widget', () => {
    const fixture = createRenderer({
      template: `<ais-index indexName="test-index"></ais-index>`,
      TestedWidget: NgAisIndex,
    })();
    const {
      mainIndex,
    } = fixture.componentInstance.testedWidget.instantSearchInstance.instantSearchInstance;

    expect(mainIndex.getWidgets()).toHaveLength(1);
    expect(mainIndex.getWidgets()[0]).toEqual(
      expect.objectContaining({ $$type: 'ais.index' })
    );
  });

  it('passes indexName to widget', () => {
    const fixture = createRenderer({
      template: `<ais-index indexName="test-index"></ais-index>`,
      TestedWidget: NgAisIndex,
    })();

    const { widget } = fixture.componentInstance.testedWidget;

    expect(widget.getIndexName()).toBe('test-index');
    expect(widget.getIndexId()).toBe('test-index');
  });

  it('passes indexId to widget', () => {
    const fixture = createRenderer({
      template: `<ais-index indexName="test-index" indexId="test-indexid"></ais-index>`,
      TestedWidget: NgAisIndex,
    })();

    const { widget } = fixture.componentInstance.testedWidget;

    expect(widget.getIndexName()).toBe('test-index');
    expect(widget.getIndexId()).toBe('test-indexid');
  });

  it('allows for nested indices', () => {
    const fixture = createRenderer({
      template: `
      <div>
        <ais-search-box></ais-search-box>
        <ais-index indexName="1">
          <ais-search-box></ais-search-box>
        </ais-index>
        <ais-index indexName="2">
          <ais-search-box></ais-search-box>
          <ais-index indexName="2.1">
            <ais-search-box></ais-search-box>
          </ais-index>
        </ais-index>
      </div>`,
      TestedWidget: NgAisIndex,
      additionalDeclarations: [NgAisSearchBox],
    })();
    const {
      mainIndex,
    } = fixture.componentInstance.testedWidget.instantSearchInstance.instantSearchInstance;

    const cleanWidget = ({ $$type, ...widget }) =>
      $$type === 'ais.index'
        ? {
            $$type,
            indexName: widget.getIndexName(),
            indexId: widget.getIndexId(),
          }
        : { $$type };

    const getWidgets = index =>
      index
        .getWidgets()
        .map(
          widget =>
            widget.$$type === 'ais.index'
              ? [cleanWidget(widget), getWidgets(widget)]
              : cleanWidget(widget)
        );

    expect(getWidgets(mainIndex)).toMatchInlineSnapshot(`
      Array [
        Object {
          "$$type": "ais.searchBox",
        },
        Array [
          Object {
            "$$type": "ais.index",
            "indexId": "1",
            "indexName": "1",
          },
          Array [
            Object {
              "$$type": "ais.searchBox",
            },
          ],
        ],
        Array [
          Object {
            "$$type": "ais.index",
            "indexId": "2",
            "indexName": "2",
          },
          Array [
            Object {
              "$$type": "ais.searchBox",
            },
            Array [
              Object {
                "$$type": "ais.index",
                "indexId": "2.1",
                "indexName": "2.1",
              },
              Array [
                Object {
                  "$$type": "ais.searchBox",
                },
              ],
            ],
          ],
        ],
      ]
    `);
  });

  it('should create a widget that sets the $$widgetType metadata', () => {
    const render = createRenderer({
      TestedWidget: NgAisIndex,
      template: '<ais-index indexName="test-index"></ais-index>',
    });
    const fixture = render();

    expect(fixture.componentInstance.testedWidget.widget).toEqual(
      expect.objectContaining({
        $$widgetType: 'ais.index',
      })
    );
  });
});
