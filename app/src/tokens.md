---
title: Tokens
toc: true
---

# Tokens

Tokens are the raw design values (`src/tokens/*.css`). They are plain custom properties without prefix, and `variables.css` is the only place that connects them to Bootstrap. The swatches and values below are read from the loaded stylesheet: change a token and refresh the page to see the result.

```js
import {colorSwatches, typefaceSamples, tokenTable, headingScale, spacingScale} from "./examples.js";
```

## Colors

Defined in `src/tokens/colors.css`.

### Interface

```js
display(colorSwatches([
  ["Primary", "--color-primary"],
  ["Secondary", "--color-secondary"],
  ["Success", "--color-success"],
  ["Danger", "--color-danger"],
  ["Warning", "--color-warning"],
  ["Info", "--color-info"],
  ["Text", "--color-text"],
  ["Muted text", "--color-text-muted"],
  ["Background", "--color-background"],
  ["Surface", "--color-surface"],
  ["Border", "--color-border"],
]));
```

`--color-background` must be an opaque color, because dialogs, menus, popovers and form controls use it as their background.

### Bootstrap mapping

The primary, secondary, success, danger, warning and info tokens feed Bootstrap's theme colors, so themed components (buttons, badges, alerts, form controls, links, focus rings) follow them. These swatches show the raw tokens beside the resulting Bootstrap values.

```js
display(colorSwatches([
  ["Primary token", "--color-primary"],
  ["Bootstrap primary", "--bs-primary-bg"],
  ["Secondary token", "--color-secondary"],
  ["Bootstrap secondary", "--bs-secondary-bg"],
  ["Success token", "--color-success"],
  ["Bootstrap success", "--bs-success-bg"],
  ["Danger token", "--color-danger"],
  ["Bootstrap danger", "--bs-danger-bg"],
  ["Warning token", "--color-warning"],
  ["Bootstrap warning", "--bs-warning-bg"],
  ["Info token", "--color-info"],
  ["Bootstrap info", "--bs-info-bg"],
]));
```

### Layers

Foreground, background and border layers map to the text, surface and border tokens.

```js
display(colorSwatches([
  ["Foreground 1", "--bs-fg-1"],
  ["Foreground 2", "--bs-fg-2"],
  ["Foreground 3", "--bs-fg-3"],
  ["Background body", "--bs-bg-body"],
  ["Background 1", "--bs-bg-1"],
  ["Background 2", "--bs-bg-2"],
  ["Background 3", "--bs-bg-3"],
  ["Border", "--bs-border-color"],
]));
```

### Process phases

```js
display(colorSwatches([
  ["Explore", "--color-phase-explore"],
  ["Define", "--color-phase-define"],
  ["Design", "--color-phase-design"],
  ["Integrate", "--color-phase-integrate"],
  ["Deliver", "--color-phase-deliver"],
]));
```

## Typography

Defined in `src/tokens/typography.css`. Fonts load from Google Fonts in `src/fonts.css`.

```js
display(typefaceSamples([
  ["Heading", "--font-family-heading"],
  ["Condensed headings", "--font-family-condensed"],
  ["Body token", "--font-family-sans"],
  ["Bootstrap body", "--bs-body-font-family"],
  ["Code", "--font-family-mono"],
  ["Data visualization", "--font-family-viz"],
]));
```

```js
display(tokenTable([
  ["--font-size-base", "Body text size"],
  ["--font-weight-normal", "Body text weight"],
  ["--font-weight-bold", "Default Bootstrap heading weight"],
  ["--line-height-base", "Body line height"],
  ["--line-height-heading", "Heading line height"],
]));
```

### Headings

```js
display(headingScale());
```

`h1`–`h2` use the heading face; `h3`–`h6` use the condensed face (`overrides/typography.css`).

## Spacing and shape

Defined in `src/tokens/spacing.css`.

```js
display(tokenTable([
  ["--space-unit", "Mapped to Bootstrap's --bs-spacer"],
  ["--radius-base", "Mapped to Bootstrap's --bs-radius-5"],
  ["--container-padding-x", "Available horizontal container padding"],
]));
```

Bootstrap's numbered spacing utilities (`p-*`, `gap-*`) use their own scale, so changing `--space-unit` alone does not rescale them.

### Spacer scale

```js
display(spacingScale());
```

### Shape

<div class="d-flex flex-wrap align-items-end gap-5 my-5">
  <div class="bg-1 border p-5" style="border-radius: var(--radius-base)"><code>--radius-base</code></div>
</div>

## Utility

The custom `text-balance` utility balances the lines of a short heading.

<div class="border p-5" style="max-width: 22rem">
  <h3 class="text-balance mb-0">Make a clear idea easier to read on every screen</h3>
</div>
