import {ScrollSpy} from "npm:bootstrap@6.0.0-alpha.1/dist/js/bootstrap.bundle.min.js";

// Mark the navbar link of the current page.
const here = location.pathname.replace(/(\.html|\/)$/, "") || "/index";
for (const link of document.querySelectorAll("#observablehq-header a.nav-link[href]")) {
  const path = new URL(link.href).pathname.replace(/(\.html|\/)$/, "") || "/index";
  if (path !== here) continue;
  link.classList.add("active");
  link.setAttribute("aria-current", "page");
}

// Highlight the table of contents link of the section being read.
if (document.querySelector("#observablehq-toc")) {
  new ScrollSpy(document.body, {target: "#observablehq-toc", topMargin: "96px"});
}
