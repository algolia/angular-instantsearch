---
title: Widgets - Configure
layout: widget.pug
---

# Configure

## Description

Configure is a widget that lets you provide raw search parameters to the Algolia API.

Any of the searchParameters added to this widget will be forwarded to Algolia. For more information on the different parameters that can be set, have a look at the [reference](https://www.algolia.com/doc/api-client/javascript/search#search-parameters).

You can dynamically update the `searchParameters` Object and a new search will be triggered.

## Options

| Attribute            | Type       | Description
| -                    | -          | -
| `searchParameters`   | `Object`   | Search parameters to forward to Algolia

## Code example

```html
<ais-configure
  [searchParameters]="{ hitsPerPage: 3, analytics: true }"
>
</ais-configure>
```
