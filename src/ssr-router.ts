import originalHistory, {
  BrowserHistoryArgs,
  BrowserHistory,
} from 'instantsearch.js/es/lib/routers/history';
import * as qs from 'qs';

type Req = { url: string }; // @TODO: express req, what's its type?

type ParseServerURL = (
  args: {
    qsModule: typeof qs;
    req: Req;
  }
) => ReturnType<BrowserHistoryArgs['parseURL']>;

type SsrHistoryProps = BrowserHistoryArgs & {
  // @MAJOR: avoid this indirection in InstantSearch.js, by having only one parseURL, which is the equivalent of createURL and accepts a string, not a whole environment object.
  parseServerURL: ParseServerURL;
};

const defaultParseServerURL = ({ qsModule, req }) => {
  // `qs` by default converts arrays with more than 20 items to an object.
  // We want to avoid this because the data structure manipulated can therefore vary.
  // Setting the limit to `100` seems a good number because the engine's default is 100
  // (it can go up to 1000 but it is very unlikely to select more than 100 items in the UI).
  //
  // Using an `arrayLimit` of `n` allows `n + 1` items.
  //
  // See:
  //   - https://github.com/ljharb/qs#parsing-arrays
  //   - https://www.algolia.com/doc/api-reference/api-parameters/maxValuesPerFacet/

  return qsModule.parse(req.url.slice(req.url.lastIndexOf('?') + 1), {
    arrayLimit: 99,
  });
};

type SsrHistory = BrowserHistory & {
  readServer: (req: Req) => ReturnType<ParseServerURL>;
};

export function ssrRouter(args: SsrHistoryProps = {} as SsrHistoryProps) {
  const historyRouter = originalHistory(args);

  const { parseServerURL = defaultParseServerURL } = args;

  (historyRouter as SsrHistory).readServer = (req: Req) => {
    return parseServerURL({ qsModule: qs, req });
  };

  return historyRouter;
}
