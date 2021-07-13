export function bem(widgetName: string) {
  const cx = function(element?: string, subElement?: string) {
    let cssClass = `ais-${widgetName}`;
    if (element) {
      cssClass += `-${element}`;
    }
    if (subElement) {
      cssClass += `--${subElement}`;
    }
    return cssClass;
  };
  return cx;
}

export function parseNumberInput(input?: number | string) {
  return typeof input === 'string' ? parseInt(input, 10) : input;
}

export function noop(...args: any[]): void {}

export function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// See https://github.com/algolia/instantsearch.js/blob/9296022fecadfbf82f15e837c215a1356eac4bc5/src/lib/utils/range.ts
export function range({
  start = 0,
  end,
  step = 1,
}: {
  start?: number;
  end: number;
  step?: number;
}): number[] {
  // We can't divide by 0 so we re-assign the step to 1 if it happens.
  const limitStep = step === 0 ? 1 : step;

  // In some cases the array to create has a decimal length.
  // We therefore need to round the value.
  // Example:
  //   { start: 1, end: 5000, step: 500 }
  //   => Array length = (5000 - 1) / 500 = 9.998
  const arrayLength = Math.round((end - start) / limitStep);

  return [...Array(arrayLength)].map(
    (_, current) => start + current * limitStep
  );
}

// See https://github.com/algolia/react-instantsearch/blob/86dfe8674d566124af55a8f044051d0062786c1a/packages/react-instantsearch-core/src/core/utils.ts#L138-L142
export function getPropertyByPath(object: object, path: string): any {
  return path
    .replace(/\[(\d+)]/g, '.$1')
    .split('.')
    .reduce((current, key) => (current ? current[key] : undefined), object);
}
