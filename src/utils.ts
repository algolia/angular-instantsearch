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
