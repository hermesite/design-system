// See https://observablehq.com/framework/config for documentation.
import {info, versionBadge} from "./version.js";

const pages = [
  {name: "Overview", path: "/"},
  {name: "Tokens", path: "/tokens"},
  {name: "Breakpoints", path: "/breakpoints"},
  {name: "Bootstrap components", path: "/bootstrap"},
  {name: "Custom components", path: "/components"}
];

const navbar = `<nav class="navbar border" aria-label="Main">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Design system</a>
    <ul class="navbar-nav flex-row flex-wrap gap-5 me-auto">${pages
      .map(({name, path}) => `<li class="nav-item"><a class="nav-link" href="${path}">${name}</a></li>`)
      .join("")}</ul>
    ${versionBadge()}
  </div>
</nav>`;

export default {
  title: "Design system",
  root: "src",
  // Marks pages loaded inside an iframe of the app (live examples) so style.css can hide the chrome.
  head: '<link rel="icon" href="data:,"><script>if (self !== top) document.documentElement.classList.add("embedded");</script><script type="module" src="/shell.js"></script>',
  // `style` replaces `theme`: Observable's default styles are not loaded, see style.css.
  style: "style.css",
  header: navbar,
  footer: `<p>Design system <strong>v${info.version}</strong> · Built on Bootstrap ${info.bootstrap} · MIT license</p>`,
  sidebar: false,
  toc: false,
  pager: false,
  search: false,
  typographer: true
};
