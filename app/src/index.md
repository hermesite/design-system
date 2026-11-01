---
title: Overview
toc: true
---

```js
const info = await FileAttachment("data/info.json").json();
```

# Design system

A personal design system built on top of Bootstrap ${info.bootstrap}. It is plain CSS, mobile-first, and loaded through a single entry point (`index.css`). This app lets you browse its tokens, breakpoints and components, rendered with the stylesheet itself.

<div class="row g-5 my-7">
  <div class="md:col-6 lg:col-3">
    <div class="card h-100">
      <div class="card-body">
        <h2 class="card-title h3">Tokens</h2>
        <p>Colors, typography, spacing and shape, and how they map to Bootstrap.</p>
        <a class="btn-outline theme-primary" href="./tokens">Explore tokens</a>
      </div>
    </div>
  </div>
  <div class="md:col-6 lg:col-3">
    <div class="card h-100">
      <div class="card-body">
        <h2 class="card-title h3">Breakpoints</h2>
        <p>The mobile-first screen sizes and the file that manages each one.</p>
        <a class="btn-outline theme-primary" href="./breakpoints">Explore breakpoints</a>
      </div>
    </div>
  </div>
  <div class="md:col-6 lg:col-3">
    <div class="card h-100">
      <div class="card-body">
        <h2 class="card-title h3">Bootstrap components</h2>
        <p>Buttons, forms, cards, dialogs and more, restyled by the tokens.</p>
        <a class="btn-outline theme-primary" href="./bootstrap">Explore Bootstrap</a>
      </div>
    </div>
  </div>
  <div class="md:col-6 lg:col-3">
    <div class="card h-100">
      <div class="card-body">
        <h2 class="card-title h3">Custom components</h2>
        <p>The patterns Bootstrap does not have: section, process phase, stack, gallery and workspace.</p>
        <a class="btn-outline theme-primary" href="./components">Explore components</a>
      </div>
    </div>
  </div>
</div>

## Current version

| Package | Version |
| --- | --- |
| Design system | <code>${info.version}</code> |
| Bootstrap | <code>${info.bootstrap}</code> |

The design system version is read from `design-system/package.json` and shown in the header and footer of every page.

## How the parts fit together

The stylesheet is loaded in this order, and each layer overrides the previous one:

1. **Fonts** load the web fonts.
2. **Bootstrap** provides the base styles, layout and components.
3. **Tokens** define raw values: colors, fonts and spacing.
4. **Variables** map those tokens onto Bootstrap's `--bs-*` variables.
5. **Overrides** restyle existing Bootstrap components.
6. **Components** add the patterns that Bootstrap does not have.
7. **Utilities** add custom utility classes.
8. **Breakpoints** hold the rules specific to a screen size, base first and then ascending `min-width`.

`variables.css` is imported unlayered so its mappings beat Bootstrap's unlayered root defaults; changing a token therefore restyles every component that reads it.

## Use it in a project

```css
@import "path/to/design-system/index.css";
```

Install the `bootstrap` dependency in `design-system/` and import `index.css` through a bundler that resolves `@import` and `node_modules`. See the [README](https://github.com/hermesite/design-system#install-in-a-new-project) for details.

## Run this app

```sh
cd design-system && npm install
cd app && npm install && npm run dev
```

Token values are read from the loaded CSS; refresh the page after changing them.
