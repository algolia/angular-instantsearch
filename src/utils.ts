import { capitalize } from "lodash";

export function bem(widgetName: string) {
  const capitalizedWidgetName = capitalize(widgetName);
  return (element?: string) => {
    if (element) {
      const scoppedWidgetName = `ais-${capitalizedWidgetName}-${element}`;

      // output `ais-Widget-Header|Body|Footer ais-Header|Body|Footer`
      if (element === "header" || element === "body" || element === "footer") {
        const nonScoppedWidgetName = `ais-${element}`;
        return `${scoppedWidgetName} ${nonScoppedWidgetName}`;
      }

      // output `ais-Widget-Xyz`
      return scoppedWidgetName;
    } else {
      // output `ais-Widget`
      return `ais-${capitalizedWidgetName}`;
    }
  };
}
