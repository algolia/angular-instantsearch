// TODO: prevent qs leaking as a dependency, by not using parseURL, but changing .read?
import * as qs from 'qs';
import { Routing } from 'instantsearch.js/es/lib/InstantSearch';

// TODO: put this maybe inside InstantSearch.js?
export function parseServerRequest(
  req: { url: string } | undefined,
  { router, stateMapping }: Routing
) {
  if (!req || !req.url) {
    return undefined;
  }

  // this is for faking the browser API used by the router.
  const location = { search: `?${req.url.split('?')[1]}` };
  // TODO: this is "private" in IS.js, but since you can change the parseURL
  // in historyRouter, we need to use it directly
  // we can't call .read here, since that uses browser globals, unless it can be injected
  // @ts-ignore parseURL is still private
  const routeState = router.parseURL({ qsModule: qs, location });

  return stateMapping.routeToState(routeState);
}
