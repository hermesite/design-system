# Design system

Personal design system built on top of Bootstrap 6 (6.0.0-alpha.1, pinned). Plain CSS (no build step of its own), mobile-first, and loaded through a single entry point: `index.css`.

Bootstrap 6 needs Chrome/Edge 130, Firefox 132 or Safari 18 (it uses `light-dark()`, `oklch()`, `color-mix()`, `:has()`, container queries and native `<dialog>`). Its class names and tokens differ from v5; see the [migration guide](https://getbootstrap.com/docs/6.0/guides/migration).

## Structure

```
design-system/
├── index.css                 Entry point (imports everything, in order)
├── package.json              Declares the bootstrap dependency and the version
├── app/                      Web app to browse tokens, breakpoints and components
└── src/
    ├── fonts.css             Google Fonts import (Kreon, Big Shoulders, Roboto Condensed)
    ├── bootstrap.css         Imports Bootstrap's CSS from node_modules
    ├── tokens/               Raw design values (colors, typography, spacing)
    ├── variables.css         Maps tokens onto Bootstrap's --bs-* variables
    ├── overrides/            Changes to existing Bootstrap components/elements
    ├── components/           New components that Bootstrap does not have
    ├── utilities/            Custom utility classes
    └── breakpoints/          base.css (mobile) + sm, md, lg, xl, 2xl
```

Load order matters; each layer overrides the previous one:
Bootstrap → tokens → variables → overrides → components → utilities → breakpoints.

Bootstrap 6 ships its component CSS in `@layer`s (`colors, config, root, reboot, layout, content, forms, components, custom, helpers, utilities`). Everything after Bootstrap in `index.css` is imported with `layer(custom)`, so it beats Bootstrap's components but not its helpers and utilities. Unlayered CSS beats all of them.

In the pinned Bootstrap alpha, the root custom-property declarations are unlayered, so a layered `variables.css` would never override them. `index.css` therefore imports `variables.css` **unlayered**, after Bootstrap: same selector (`:root, :host`), later in the cascade, so the `--bs-*` mappings win. Only custom properties live in that file, so nothing else is promoted above Bootstrap's helpers and utilities.

## Browse the design system

`app/` is a small [Observable Framework](https://observablehq.com/framework/) app to browse, navigate and explore the design system. It loads `index.css`, so it shows the default tokens, fonts and components exactly as a project would get them. It is not part of the CSS package: `app/` has its own `package.json`, so projects that only use the CSS do not install its dependencies.

| Page | Contents |
| --- | --- |
| `/` | Overview, load order and current versions |
| `/tokens` | Colors, typography, spacing and shape, read live from the loaded CSS |
| `/breakpoints` | Breakpoint files, current breakpoint, responsive grid and visibility |
| `/bootstrap` | Bootstrap components restyled by the tokens: buttons, badges, forms, alerts, cards, list group, breadcrumb, tables, dialog |
| `/components` | Custom components: section, process phase, stack, gallery and workspace |

The header and footer show the design system version, read from `package.json` (`version`), and the installed Bootstrap version.

```sh
cd design-system
npm install
cd app
npm install
npm run dev
```

Open <http://localhost:3000/>. Token values are read from the loaded CSS; refresh the page after changing them. `npm run build` writes a static site to `app/dist/`.

The pages enable Observable's table of contents with `toc: true` in their frontmatter. `app/src/shell.js` displays it from 1024px upwards and uses Bootstrap ScrollSpy to highlight the section being read; it is hidden in embedded pages (the workspace example).

To document a new component in the app, add a section to `app/src/components.md` with a live example and its markup. To version the design system, bump `version` in `package.json`.

The portfolio ([`portfolio-web`](https://github.com/hermesite/portfolio-web)) keeps its own examples of the design system in use, under `/design-system/`.

## Install in a new project

1. Copy (or symlink / git submodule) the `design-system/` folder into the project.
2. Install its dependency:
   ```sh
   cd design-system && npm install
   ```
3. Import the entry point from the project's main stylesheet, or link it directly:
   ```css
   @import "path/to/design-system/index.css";
   ```
   The import must go through a bundler that resolves `@import` and `node_modules` (esbuild, Vite, Parcel, webpack, Observable Framework...). Without a bundler, run one once to produce a single CSS file and serve that.
4. Use Bootstrap's markup and classes as usual.

If the host project already installs Bootstrap, remove `bootstrap` from `design-system/package.json` and make sure `bootstrap/dist/css/bootstrap.css` resolves from `src/bootstrap.css`.

### Observable Framework (this repo)

`portfolio-web/src/style.css` does not load Observable's default styles or theme. It keeps only the renderers for code output (inspector, plots, syntax highlighting) in a lowest-priority `observable` layer, lays out Observable's page shell (`#observablehq-*`) as a centered grid, then imports the design system. `portfolio-web/observablehq.config.js` points to it with `style: "style.css"`.

- The sidebar is off (`sidebar: false`). The navbar in the header is built from `pages` in the config: sections are Bootstrap menus and the toggler opens a drawer on small screens.
- `portfolio-web/src/shell.js` (loaded from `head`) imports Bootstrap's JS bundle, marks the current page in the navbar and runs Bootstrap's ScrollSpy on the table of contents (frontmatter `toc: true`).
- `style` replaces `theme`, so a page that sets `theme:` in its frontmatter drops `style.css`. Remove `theme:` from pages that should use the design system.
- The Observable theme is light only, so `portfolio-web/src/style.css` sets `color-scheme: light` (Bootstrap 6 follows the system color mode by default).
- Observable's `.card`, `.grid` and `.note` classes are no longer styled; use Bootstrap's `.card` and `.row`/`.md:col-*`.

## Customise

| Goal | File |
| --- | --- |
| Change brand colors, fonts, radius, spacing | `src/tokens/*.css` |
| Rewrite Bootstrap tokens (`--bs-*`) | `src/variables.css` |
| Restyle an existing Bootstrap component | `src/overrides/<component>.css`, then import it in `src/overrides/index.css` |
| Rules specific to a screen size | `src/breakpoints/<size>.css` |
| Add a utility class | `src/utilities/index.css` |

Tokens are plain custom properties without prefix (`--color-primary`, `--font-family-sans`, `--space-unit`, `--radius-base`...). `variables.css` is the only place that connects them to Bootstrap.

`variables.css` maps `--space-unit` to Bootstrap's `--bs-spacer`. The numbered `--bs-spacer-*` values are separate, so changing `--space-unit` alone does not rescale spacing utilities such as `p-*` and `gap-*`.

Bootstrap 6 colors components through theme tokens: `.theme-primary` makes buttons, badges, alerts and more read `--bs-primary-base`, `-bg`, `-fg`, `-fg-emphasis`, `-bg-subtle`, `-bg-muted`, `-border`, `-focus-ring` and `-contrast`. `variables.css` declares values derived from `--color-primary`, `--color-secondary`, `--color-success`, `--color-danger`, `--color-warning` and `--color-info` with `color-mix()` (`warning` and `info` use `--color-text` as their contrast color, since their backgrounds are light), and maps the layer tokens (`--bs-fg-*`, `--bs-bg-*`, `--bs-border-*`) to the corresponding design tokens, so components such as the navbar, alerts, forms, cards and dialogs follow `--color-*` automatically. `--color-background` must be an opaque color, because dialogs, menus, popovers and form controls use it as their background. The design tokens are single-mode values; use `light-dark()` to support dark mode.

Fonts: `--font-family-heading` (Kreon) feeds `--bs-heading-font-family`, which Bootstrap's headings read; `overrides/typography.css` applies it to titles that do not (`.navbar-brand`, `.card-title`, `.dialog-title`, `.drawer-title`). `--font-family-condensed` (Roboto Condensed) is applied to `h3`–`h6` in `overrides/typography.css`. `--font-family-sans` feeds the body text through `--bs-body-font-family`; `--font-family-viz` (Big Shoulders) is available for data visualisation. Fonts load from Google Fonts in `src/fonts.css`.

### Breakpoints

Mobile-first: `base.css` has no media query; the others use `min-width` and match Bootstrap 6's breakpoints. Bootstrap 6 renamed `xxl` to `2xl` and raised `lg`, `xl` and `2xl`.

| File | Starts at |
| --- | --- |
| `base.css` | 0 |
| `sm.css` | 576px |
| `md.css` | 768px |
| `lg.css` | 1024px |
| `xl.css` | 1280px |
| `2xl.css` | 1536px |

### Bootstrap 6 markup reminders

- Responsive classes use a prefix: `md:col-6`, `md:d-none` (v5: `col-md-6`, `d-md-none`).
- Component colors come from `.theme-*` classes: `btn-solid theme-primary`, `btn-outline theme-secondary`, `badge theme-primary` (v5: `btn-primary`, `btn-outline-secondary`, `badge bg-primary`).
- The spacer scale has 13 steps and its keys changed: v5 `2, 3, 4, 5` are now `3, 5, 7, 12` (`gap-2` → `gap-3`, `p-3` → `p-5`).
- `.text-reset` is `.fg-reset`; `.display-*`, `.lead`, `.text-bg-*` and `.bg-light`/`.bg-dark` were removed.
- `.modal` is `.dialog` and `.offcanvas` is `.drawer`.

### Overrides

| File | What it does |
| --- | --- |
| `typography.css` | Applies the heading font to titles that ignore `--bs-heading-font-family` |
| `button.css` | Empty: v6 buttons read the theme tokens from `variables.css` |
| `table.css` | Gives unclassed `<table>` elements (e.g. Markdown tables) Bootstrap's table look |

## Custom components

Not part of Bootstrap. Each lives in `src/components/<name>.css` and is registered in `src/components/index.css`. Layout (flex, gap, spacing, borders) comes from Bootstrap utility classes in the markup; the CSS only adds what utilities cannot express.

### `.section`

A padded block for grouping page content. Add a utility such as `border` when a border is needed.

```html
<div class="section">...</div>
```

Process phase sections (generated by `portfolio-web/src/components/process.js`) add a `.section-explore`, `.section-define`, `.section-design`, `.section-integrate` or `.section-deliver` modifier. It sets `--section-color` from the matching `--color-phase-*` token, used as the solid background with white text. Hooks: `.section-activities` and `.section-activity` (mini cards, accented with `--section-color`) and `.section-stack` (white panel for the tool icons).

### Gallery

Image slider with thumbnails, swipe, keyboard navigation and a stacked list on small screens. Markup is generated by `portfolio-web/src/components/gallery.js`.

Hooks: `.gallery`, `.gallery-nav`, `.gallery-thumbs`, `.gallery-thumb`, `.gallery-viewport`, `.gallery-track`, `.gallery-slide`, `.gallery-frame`, `.gallery-caption`, `.gallery-btn`, `.gallery-list`.
`aria-current="true"` marks the active slide/thumbnail; `data-ready` on `.gallery-track` enables the slide transition. Height is set with `--gallery-height`.

### Stack

List of tools (technologies, libraries and software), disciplines and social links with icons or color dots. Markup is generated by `portfolio-web/src/components/stack.js`; items come from the `tools`, `disciplines`, `process` and `social` categories of `portfolio-web/src/components/catalog.js`.

Hooks: `.stack`, `.stack-group`, `.stack-list`, `.stack-item`, `.stack-item-icon`, `.stack-item-filled`, `.stack-icon`, `.stack-dot`.
Per-item colors are passed with `--stack-color` and `--stack-ink` (inline style).

### Workspace

Three-panel layout: about, menu and stage. Stacked on small screens (about and stage fill the screen height, the menu takes 40% of it); three full-height columns that scroll on their own from `lg` up (`breakpoints/lg.css`). Markup and behavior come from `portfolio-web/src/components/workspace.js`: the menu lists every page in `portfolio-web/src/components/pages.js`, grouped and always expanded, and its links load into the stage iframe.

```html
<div class="workspace">
  <section class="workspace-pane workspace-about">...</section>
  <nav class="workspace-pane workspace-menu">...</nav>
  <section class="workspace-pane workspace-stage"><iframe class="workspace-stage-frame">...</section>
</div>
```

In this project the home page (`index.md`) is the workspace and the stage shows `sections/process.md` until a menu item replaces it. Pages loaded in the stage hide the navbar, footer and table of contents (`portfolio-web/src/style.css`).

### Process phase

Colored block with an optional banner image (visible from `md` up) and a white outcomes panel.

```html
<div class="process-phase process-phase-explore">
<img class="process-phase-banner" src="/images/process-explore-banner.png" alt="">

...content...

<div class="process-phase-outcomes">...</div>

</div>
```

Modifiers: `-explore`, `-define`, `-design`, `-integrate`, `-deliver`. Colors come from the `--color-phase-*` tokens. Use `<img>` for the banner so Observable Framework copies the file in the build.

## Adding a new component

1. Create `src/components/<name>.css` using tokens and `--bs-*` variables, not hardcoded colors.
2. Import it in `src/components/index.css`.
3. Put screen-size rules in the matching `src/breakpoints/<size>.css`.
4. Document it in this file.
