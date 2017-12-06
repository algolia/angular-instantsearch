import { AlgoliaSearchHelper } from "algoliasearch-helper";

// Transforms url query to SearchParameters
export function parseServerRequest(req: { url: string } | void) {
  if (req && req.url && req.url.includes("?")) {
    const query = req.url.split("?")[1];
    return AlgoliaSearchHelper.getConfigurationFromQueryString(query);
  }

  return {};
}
