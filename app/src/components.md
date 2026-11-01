---
title: Custom components
toc: true
---

# Custom components

Patterns that Bootstrap does not have. Each lives in `src/components/<name>.css` and is registered in `src/components/index.css`. Layout (flex, gap, spacing, borders) comes from Bootstrap utility classes in the markup; the CSS only adds what utilities cannot express.

## Section

`.section` pads a block of page content; add a utility such as `border` when a border is needed. The phase modifiers (`.section-explore`, `.section-define`, `.section-design`, `.section-integrate`, `.section-deliver`) set `--section-color` from the matching `--color-phase-*` token, used as background with white text.

<div class="section border">
  <header>
    <h3>Grouped content</h3>
    <p class="mb-0">A padded section brings related content together.</p>
  </header>
</div>

```html run=false
<div class="section border">...</div>
```

### Phase sections

Hooks: `.section-activities` and `.section-activity` (mini cards accented with `--section-color`), `.section-stack` (white panel for tool icons) and `.process-card-body`.

<section class="section section-explore mb-5">
  <div class="row">
    <header>
      <h3>Explore</h3>
      <p><em>Research and discovery.</em></p>
    </header>
    <div class="process-card-body bg-muted-secondary bg-20">
      <h4>Key activities</h4>
      <ul class="section-activities">
        <li class="section-activity">Interviews</li>
        <li class="section-activity">Audit</li>
        <li class="section-activity">Benchmark</li>
      </ul>
    </div>
  </div>
</section>

```html run=false
<section class="section section-explore">
  <div class="row">
    <header>...</header>
    <div class="process-card-body bg-muted-secondary bg-20">
      <ul class="section-activities">
        <li class="section-activity">Interviews</li>
      </ul>
    </div>
  </div>
</section>
```

## Process phase

Colored block with an optional banner image (visible from `md` up) and a white outcomes panel. Modifiers: `-explore`, `-define`, `-design`, `-integrate`, `-deliver`; colors come from the `--color-phase-*` tokens.

```js
// Placeholder banner so the example does not need an image file.
const banner = (color) => "data:image/svg+xml," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 128"><circle cx="190" cy="64" r="48" fill="${color}" opacity=".5"/><circle cx="150" cy="40" r="24" fill="#fff" opacity=".4"/></svg>`);
const phases = [
  ["explore", "Research and discovery"],
  ["define", "Insights and requirements"],
  ["design", "Prototypes and testing"],
  ["integrate", "Development and validation"],
  ["deliver", "Launch and handover"],
];
display(html`<div class="d-flex flex-column gap-5">${phases.map(
  ([id, text]) => html`<div class=${`process-phase process-phase-${id}`}>
    <img class="process-phase-banner" src=${banner("#fff")} alt="">
    <div class="process-phase-outcomes"><strong>${id[0].toUpperCase() + id.slice(1)}</strong> — ${text}</div>
  </div>`
)}</div>`);
```

```html run=false
<div class="process-phase process-phase-explore">
  <img class="process-phase-banner" src="banner.png" alt="">
  <div class="process-phase-outcomes">Research and discovery</div>
</div>
```

## Stack

List of tools, disciplines and social links, with color dots, filled labels or icons. Per-item colors are passed with `--stack-color` and `--stack-ink` (inline style). Hooks: `.stack`, `.stack-group`, `.stack-list`, `.stack-item`, `.stack-item-icon`, `.stack-item-filled`, `.stack-icon`, `.stack-dot`.

<div class="stack d-inline-flex flex-column gap-5">
  <div class="stack-group d-flex flex-wrap align-items-baseline row-gap-3 column-gap-5">
    <ul class="stack-list d-flex flex-wrap gap-3 m-0 p-0 list-unstyled">
      <li class="stack-item d-inline-flex align-items-center gap-3 m-0 px-5 py-1" style="--stack-color: #e34f26"><span class="stack-dot rounded-circle"></span>HTML</li>
      <li class="stack-item d-inline-flex align-items-center gap-3 m-0 px-5 py-1" style="--stack-color: #1572b6"><span class="stack-dot rounded-circle"></span>CSS</li>
      <li class="stack-item d-inline-flex align-items-center gap-3 m-0 px-5 py-1" style="--stack-color: #7952b3"><span class="stack-dot rounded-circle"></span>Bootstrap</li>
    </ul>
  </div>
  <div class="stack-group d-flex flex-wrap align-items-baseline row-gap-3 column-gap-5">
    <ul class="stack-list d-flex flex-wrap gap-3 m-0 p-0 list-unstyled">
      <li class="stack-item stack-item-filled d-inline-flex align-items-center gap-3 m-0 px-5 py-1 h5" style="--stack-color: #4f79a7; --stack-ink: #fff">UX</li>
      <li class="stack-item stack-item-filled d-inline-flex align-items-center gap-3 m-0 px-5 py-1 h5" style="--stack-color: #59a14f; --stack-ink: #fff">UI</li>
      <li class="stack-item stack-item-filled d-inline-flex align-items-center gap-3 m-0 px-5 py-1 h5" style="--stack-color: #76b7b2; --stack-ink: #000">Dataviz</li>
    </ul>
  </div>
  <div class="stack-group d-flex flex-wrap align-items-baseline row-gap-3 column-gap-5">
    <ul class="stack-list d-flex flex-wrap gap-3 m-0 p-0 list-unstyled">
      <li class="stack-item stack-item-icon d-inline-flex align-items-center gap-3 m-0 px-5 py-1" title="Circle" style="--stack-color: #a259ff"><span class="stack-icon d-inline-flex flex-shrink-0" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg></span><span class="visually-hidden">Circle</span></li>
      <li class="stack-item stack-item-icon d-inline-flex align-items-center gap-3 m-0 px-5 py-1" title="Square" style="--stack-color: #0079bf"><span class="stack-icon d-inline-flex flex-shrink-0" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20"/></svg></span><span class="visually-hidden">Square</span></li>
    </ul>
  </div>
</div>

```html run=false
<ul class="stack-list d-flex flex-wrap gap-3 m-0 p-0 list-unstyled">
  <li class="stack-item d-inline-flex align-items-center gap-3 px-5 py-1" style="--stack-color: #e34f26">
    <span class="stack-dot rounded-circle"></span>HTML
  </li>
</ul>
```

## Gallery

Image slider with thumbnails, swipe, keyboard navigation and a stacked list on small screens. The CSS is in the design system; the behavior is a small script (`src/components/gallery.js` in this app is the reference implementation). On wider screens use the thumbnails, arrow keys or the adjacent slide to navigate; below 640px the images are shown as a list.

Hooks: `.gallery`, `.gallery-nav`, `.gallery-thumbs`, `.gallery-thumb`, `.gallery-viewport`, `.gallery-track`, `.gallery-slide`, `.gallery-frame`, `.gallery-caption`, `.gallery-btn`, `.gallery-list`. `aria-current="true"` marks the active slide and thumbnail; `data-ready` on `.gallery-track` enables the slide transition. Height is set with `--gallery-height`.

```js
import {gallery} from "./components/gallery.js";

// Placeholder images drawn from the phase tokens, so the example does not need image files.
const slide = (color, label) => "data:image/svg+xml," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400"><rect width="640" height="400" fill="${color}"/><text x="320" y="210" font-family="sans-serif" font-size="40" fill="#fff" text-anchor="middle">${label}</text></svg>`);
const phaseColor = (name) => getComputedStyle(document.documentElement).getPropertyValue(`--color-phase-${name}`).trim();

display(gallery([
  {src: slide(phaseColor("explore"), "Explore"), alt: "Explore", caption: "Explore the problem."},
  {src: slide(phaseColor("design"), "Design"), alt: "Design", caption: "Design the solution."},
  {src: slide(phaseColor("deliver"), "Deliver"), alt: "Deliver", caption: "Deliver the result."},
]));
```

## Workspace

Three-panel layout: about, menu and stage. The panels are stacked on small screens (about and stage fill the screen height, the menu takes 40% of it) and become three full-height columns that scroll on their own from `lg` up (`breakpoints/lg.css`). The example below is a live page in an isolated frame; open it at full size to see the columns.

<iframe class="d-block w-100 border" style="height: 30rem" src="./examples/workspace" title="Live workspace example" loading="lazy"></iframe>

[Open the workspace example](./examples/workspace) at full size.

```html run=false
<div class="workspace">
  <section class="workspace-pane workspace-about">...</section>
  <nav class="workspace-pane workspace-menu">...</nav>
  <section class="workspace-pane workspace-stage"><iframe class="workspace-stage-frame">...</section>
</div>
```
