import { createRenderer } from '../../../helpers/test-renderer';
import { NgAisQueryRuleCustomData } from '../query-rule-custom-data';

describe('QueryRuleCustomData', () => {
  let render;
  let createWidget;

  beforeEach(() => {
    jest.clearAllMocks();
    createWidget = jest.spyOn(
      NgAisQueryRuleCustomData.prototype,
      'createWidget'
    );

    render = (template: string, state?: object) =>
      createRenderer({
        defaultState: state,
        template,
        TestedWidget: NgAisQueryRuleCustomData,
      })({});
  });

  it('should render without state', () => {
    const template = `<ais-query-rule-custom-data></ais-query-rule-custom-data>`;
    const state = undefined;

    const fixture = render(template, state);

    expect(fixture).toMatchSnapshot();
  });

  it('should render with empty state', () => {
    const template = `<ais-query-rule-custom-data></ais-query-rule-custom-data>`;
    const state = {};

    const fixture = render(template, state);

    expect(fixture).toMatchSnapshot();
  });

  it('should render with state', () => {
    const template = `<ais-query-rule-custom-data></ais-query-rule-custom-data>`;
    const state = { items: [{ banner: '1.jpg' }, { banner: '2.jpg' }] };

    const fixture = render(template, state);

    expect(fixture).toMatchSnapshot();
  });

  it('should render with custom templates', () => {
    const template = `
<ais-query-rule-custom-data>
  <ng-template let-items="items">
    <div *ngFor="let item of items">
      <img src="{{item.banner}}" alt="{{item.title}}">
    </div>
  </ng-template>
</ais-query-rule-custom-data>
    `;
    const state = {
      items: [
        { title: 'Banner 1', banner: '1.jpg' },
        { title: 'Banner 1', banner: '2.jpg' },
      ],
    };

    const fixture = render(template, state);

    expect(fixture).toMatchSnapshot();
  });

  it('passes transformItems', () => {
    const transformItems = 'transformItems';

    const fixture = render(
      `<ais-query-rule-custom-data
          [transformItems]="'${transformItems}'"
        >
        </ais-query-rule-custom-data>`,
      { items: [{ banner: '1.jpg' }, { banner: '2.jpg' }] }
    );

    expect(createWidget.mock.calls[0][1].transformItems).toEqual(
      transformItems
    );
  });
});
