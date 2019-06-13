export function bem(widgetName: string) {
  const cx = function(element?: string, subElement?: string) {
    if (element) {
      const scoppedWidgetName = `ais-${widgetName}-${element}`;

      // output `ais-Widget-Xyz--abc`
      if (subElement) {
        return `${scoppedWidgetName}--${subElement}`;
      }

      // output `ais-Widget-Xyz`
      return scoppedWidgetName;
    }

    // output `ais-Widget`
    return `ais-${widgetName}`;
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
