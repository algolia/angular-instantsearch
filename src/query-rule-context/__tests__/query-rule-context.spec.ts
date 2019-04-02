import { createRenderer } from '../../../helpers/test-renderer';
import { NgAisQueryRuleContext } from '../query-rule-context';

const defaultState = {
  items: ['hello'],
};

describe('QueryRuleContext', () => {
  let render;
  let createWidget;
  beforeEach(() => {
    jest.clearAllMocks();
    createWidget = jest.spyOn(NgAisQueryRuleContext.prototype, 'createWidget');
    render = (template, state = defaultState) =>
      createRenderer({
        defaultState: state,
        template,
        TestedWidget: NgAisQueryRuleContext,
      })({});
  });

  it('renders nothing without state', () => {
    const fixture = render('<ais-query-rule-context></ais-query-rule-context>');

    expect(fixture).toMatchSnapshot();
  });

  it('renders nothing with state', () => {
    const fixture = render(
      '<ais-query-rule-context></ais-query-rule-context>',
      {
        items: ['Luke', 'I am', 'your father'],
      }
    );

    expect(fixture).toMatchSnapshot();
  });

  it('passes trackedFilters and transformRuleContexts', () => {
    const trackedFilters = 'myTrackedFilters';
    const transformRuleContexts = 'myTransformRuleContexts';
    render(
      `<ais-query-rule-context
        [trackedFilters]="'${trackedFilters}'"
        [transformRuleContexts]="'${transformRuleContexts}'"
      >
      </ais-query-rule-context>`
    );

    expect(createWidget.mock.calls[0][1].trackedFilters).toEqual(
      trackedFilters
    );
    expect(createWidget.mock.calls[0][1].transformRuleContexts).toEqual(
      transformRuleContexts
    );
  });
});
