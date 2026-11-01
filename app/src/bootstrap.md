---
title: Bootstrap components
toc: true
---

# Bootstrap components

Everyday Bootstrap 6 elements, restyled by the design tokens (`variables.css`) and the overrides (`src/overrides/`). Use Bootstrap's markup and classes as usual; the design system does not rename them.

Bootstrap 6 combines a component style with a `theme-*` class (`btn-solid theme-primary`), and uses `md:`-style prefixes for responsive classes. See the [migration guide](https://getbootstrap.com/docs/6.0/guides/migration).

## Buttons and badges

<div class="border p-5 d-flex flex-wrap align-items-center gap-3">
  <button class="btn-solid theme-primary" type="button">Primary</button>
  <button class="btn-solid theme-secondary" type="button">Secondary</button>
  <button class="btn-outline theme-primary" type="button">Outline primary</button>
  <button class="btn-outline theme-secondary" type="button">Outline secondary</button>
  <button class="btn-solid theme-primary" type="button" disabled>Disabled</button>
</div>

<div class="border p-5 d-flex flex-wrap align-items-center gap-3 mt-5">
  <span class="badge theme-primary">Primary</span>
  <span class="badge theme-success">Success</span>
  <span class="badge theme-danger">Danger</span>
  <span class="badge theme-warning">Warning</span>
  <span class="badge theme-info">Info</span>
  <span class="badge badge-outline theme-secondary">Draft</span>
</div>

```html run=false
<button class="btn-solid theme-primary" type="button">Primary</button>
<button class="btn-outline theme-secondary" type="button">Secondary</button>
<span class="badge theme-primary">Active</span>
```

## Form controls

These controls are interactive examples only; they do not submit any data.

<div class="border p-5">
  <div class="form-field mb-5">
    <label class="form-label" for="example-email">Email address</label>
    <input class="form-control" id="example-email" type="email" placeholder="you@example.com">
  </div>
  <div class="form-field mb-5">
    <label class="form-label" for="example-role">Role</label>
    <select class="form-control" id="example-role">
      <option>Designer</option>
      <option>Developer</option>
      <option>Researcher</option>
    </select>
  </div>
  <div class="form-field">
    <input class="check" id="example-updates" type="checkbox" checked>
    <label for="example-updates">Receive project updates</label>
  </div>
</div>

```html run=false
<div class="form-field">
  <label class="form-label" for="email">Email address</label>
  <input class="form-control" id="email" type="email">
</div>
<div class="form-field">
  <input class="check" id="updates" type="checkbox">
  <label for="updates">Receive project updates</label>
</div>
```

## Alerts and cards

<div class="alert theme-secondary mb-5">A short message can provide context without interrupting the page.</div>
<div class="alert theme-success mb-5">Success message.</div>
<div class="alert theme-danger mb-5">Danger message.</div>
<div class="card">
  <div class="card-body">
    <h4 class="card-title">Project update</h4>
    <p>A card groups related content and an optional action.</p>
    <span class="badge badge-outline theme-secondary">In progress</span>
  </div>
</div>

## List group and breadcrumb

<div class="row g-5">
  <div class="md:col-6">
    <div class="list-group">
      <a class="list-group-item list-group-item-action active" href="./bootstrap" aria-current="true">Active item</a>
      <a class="list-group-item list-group-item-action" href="./bootstrap">Second item</a>
      <a class="list-group-item list-group-item-action" href="./bootstrap">Third item</a>
    </div>
  </div>
  <div class="md:col-6">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="./bootstrap">Home</a></li>
        <li class="breadcrumb-divider"></li>
        <li class="breadcrumb-item"><a href="./bootstrap">Library</a></li>
        <li class="breadcrumb-divider"></li>
        <li class="breadcrumb-item active" aria-current="page">Data</li>
      </ol>
    </nav>
  </div>
</div>

## Tables

Unclassed tables, including Markdown tables, receive the design system's table override (`overrides/table.css`).

| Item | Status |
| --- | --- |
| Research | Complete |
| Prototype | In progress |

## Dialog

The app loads Bootstrap's JavaScript for interactive elements. This example uses the instant dialog variant; open it, then close it with the button or Escape.

<button class="btn-outline theme-primary" type="button" data-bs-toggle="dialog" data-bs-target="#example-dialog">Open dialog</button>
<dialog class="dialog dialog-instant bg-1" id="example-dialog" aria-labelledby="example-dialog-title" aria-describedby="example-dialog-description">
  <div class="dialog-header">
    <h4 class="dialog-title" id="example-dialog-title">Example dialog</h4>
    <button class="btn-close" type="button" data-bs-dismiss="dialog" aria-label="Close" autofocus></button>
  </div>
  <div class="dialog-body">
    <p id="example-dialog-description">Use a dialog for a focused task or decision.</p>
  </div>
  <div class="dialog-footer">
    <button class="btn-solid theme-primary" type="button" data-bs-dismiss="dialog">Close</button>
  </div>
</dialog>

```html run=false
<button class="btn-outline theme-primary" type="button"
  data-bs-toggle="dialog" data-bs-target="#my-dialog">Open dialog</button>
<dialog class="dialog dialog-instant bg-1" id="my-dialog" aria-labelledby="my-dialog-title">
  <div class="dialog-header">
    <h3 class="dialog-title" id="my-dialog-title">Dialog title</h3>
    <button class="btn-close" type="button" data-bs-dismiss="dialog" aria-label="Close" autofocus></button>
  </div>
  <div class="dialog-body">Dialog content</div>
</dialog>
```
