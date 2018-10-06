---
title: Widgets - Search Box
layout: widget.pug
---

# Search Box

## Description

The Search Box component displays a search box that lets the user search for a specific query.

## Options

| Attribute          | Type      | Description
| -                  | -         | -
| `placeholder?`     | `string`  | The label of the input placeholder.
| `submitTitle?`     | `string`  | The submit button title.
| `resetTitle?`      | `string`  | The reset button title.
| `searchAsYouType?` | `boolean` | If you disable this option, new searches will only be triggered by clicking the search button or by pressing the enter key while the search box is focused.
| `autofocus?        | `boolean` | Should the search box be focused on render?.

## Code example

```html
<ais-search-box placeholder='Search for products'>
</ais-search-box>
```
