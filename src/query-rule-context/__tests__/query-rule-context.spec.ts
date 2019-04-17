import { createRenderer } from '../../../helpers/test-renderer';
import { NgAisQueryRuleContext } from '../query-rule-context';

describe('QueryRuleContext', () => {
  let render;
  let createWidget;

  beforeEach(() => {
    jest.clearAllMocks();

    createWidget = jest.spyOn(NgAisQueryRuleContext.prototype, 'createWidget');

    render = (template: string, state?: object) =>
      createRenderer({
        defaultState: state,
        template,
        TestedWidget: NgAisQueryRuleContext,
      })({});
  });

  it('renders nothing without state', () => {
    const template = '<ais-query-rule-context></ais-query-rule-context>';
    const state = undefined;

    const fixture = render(template, state);

    expect(fixture).toMatchSnapshot();
  });

  it('renders nothing with state', () => {
    const template = '<ais-query-rule-context></ais-query-rule-context>';
    const state = {
      items: ['Luke', 'I am', 'your father'],
    };

    const fixture = render(template, state);

    expect(fixture).toMatchSnapshot();
  });

  it('passes trackedFilters', () => {
    const trackedFilters = 'trackedFilters';
    const template = `<ais-query-rule-context
      [trackedFilters]="'${trackedFilters}'"
    >
    </ais-query-rule-context>`;
    const state = {};

    render(template, state);

    expect(createWidget.mock.calls[0][1].trackedFilters).toEqual(
      trackedFilters
    );
  });

  it('passes transformRuleContexts', () => {
    const transformRuleContexts = 'transformRuleContexts';
    const template = `<ais-query-rule-context
      [transformRuleContexts]="'${transformRuleContexts}'"
    >
    </ais-query-rule-context>`;
    const state = {};

    render(template, state);

    expect(createWidget.mock.calls[0][1].transformRuleContexts).toEqual(
      transformRuleContexts
    );
  });
});
