export function bem(widgetName: string) {
  const cx = function(element?: string, subElement?: string) {
    if (element) {
      const scoppedWidgetName = `ais-${widgetName}-${element}`;

      // output `ais-Widget-Header|Body|Footer ais-Header|Body|Footer`
      if (element === "header" || element === "body" || element === "footer") {
        const nonScoppedWidgetName = `ais-${element}`;
        return `${scoppedWidgetName} ${nonScoppedWidgetName}`;
      }

      // output `ais-Widget-Xyz--abc`
      if (subElement) {
        return `${scoppedWidgetName}--${subElement}`;
      }

      // output `ais-Widget-Xyz`
      return scoppedWidgetName;
    } else {
      // output `ais-Widget`
      return `ais-${widgetName}`;
    }
  };
  return cx;
}

export function parseNumberInput(input?: number | string) {
  return typeof input === "string" ? parseInt(input, 10) : input;
}
