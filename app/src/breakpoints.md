---
title: Breakpoints
toc: true
---

# Breakpoints

The design system is mobile-first: `src/breakpoints/base.css` has no media query and holds the rules for the smallest screens. The other files use `min-width` and match Bootstrap 6's breakpoints, so each one only adds what changes from that size up. Bootstrap 6 renamed `xxl` to `2xl`.

```js
import {currentBreakpoint} from "./examples.js";

const breakpoints = [
  {name: "base", min: 0, file: "base.css"},
  {name: "sm", min: 576, file: "sm.css"},
  {name: "md", min: 768, file: "md.css"},
  {name: "lg", min: 1024, file: "lg.css"},
  {name: "xl", min: 1280, file: "xl.css"},
  {name: "2xl", min: 1536, file: "2xl.css"},
];
```

```js
display(currentBreakpoint(breakpoints));
```

| File | Starts at | Manages |
| --- | --- | --- |
| `base.css` | 0 | Mobile base, no media query |
| `sm.css` | 576px | Small screens |
| `md.css` | 768px | Tablets: the process phase shows its banner |
| `lg.css` | 1024px | Desktop: the workspace becomes three columns |
| `xl.css` | 1280px | Large desktop |
| `2xl.css` | 1536px | Extra large desktop |

Resize the window to see the current breakpoint change.

## Responsive layout

Bootstrap 6 puts the breakpoint before the utility, for example `md:col-6` (v5: `col-md-6`). The grid below is one column on small screens, two from `md`, and three from `lg`.

<div class="row g-4 my-5">
  <div class="col-12 md:col-6 lg:col-4"><div class="bg-1 border p-5">01</div></div>
  <div class="col-12 md:col-6 lg:col-4"><div class="bg-1 border p-5">02</div></div>
  <div class="col-12 md:col-6 lg:col-4"><div class="bg-1 border p-5">03</div></div>
</div>

```html run=false
<div class="row">
  <div class="col-12 md:col-6 lg:col-4">...</div>
</div>
```

## Responsive visibility

<div class="d-flex flex-wrap gap-3 my-5">
  <span class="badge theme-primary d-inline-block md:d-none">Visible below md</span>
  <span class="badge theme-secondary d-none md:d-inline-block lg:d-none">Visible from md to lg</span>
  <span class="badge theme-success d-none lg:d-inline-block">Visible from lg</span>
</div>

## Add a rule for a screen size

Put the rule in the matching file; the mobile styles stay untouched.

```css
/* src/breakpoints/md.css */
@media (min-width: 768px) {
  .process-phase-banner {
    display: block;
  }
}
```
