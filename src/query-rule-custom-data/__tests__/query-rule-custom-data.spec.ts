import { createRenderer } from '../../../helpers/test-renderer';
import { NgAisQueryRuleCustomData } from '../query-rule-custom-data';

const render = createRenderer({
  defaultState: {
    items: [{ banner: 'lol yes it is a banner' }],
  },
  template: '<ais-query-rule-custom-data></ais-query-rule-custom-data>',
  TestedWidget: NgAisQueryRuleCustomData,
});

describe('QueryRuleCustomData', () => {
  it('should render without state', () => {
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it('should render with state', () => {
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });
});
