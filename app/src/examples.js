import {html} from "npm:htl";

// Values come from the loaded stylesheet, so changing a token and refreshing shows the result.
export function tokenValue(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || "Not defined";
}

export function colorSwatches(tokens) {
  return html`<div class="row g-4">${tokens.map(
    ([label, name]) => html`<div class="col-6 md:col-4 lg:col-3">
      <div class="specimen h-100">
        <div class="specimen-swatch" style=${`background-color: var(${name});`} aria-hidden="true"></div>
        <div class="p-3">
          <strong class="d-block">${label}</strong>
          <code class="d-block small text-break">${name}</code>
          <span class="d-block small fg-3 text-break">${tokenValue(name)}</span>
        </div>
      </div>
    </div>`
  )}</div>`;
}

export function typefaceSamples(tokens) {
  return html`<div>${tokens.map(
    ([label, name]) => html`<div class="border-bottom py-5">
      <div><strong>${label}</strong> <code class="text-break">${name}</code></div>
      <p class="my-3" style=${`font-family: var(${name}); font-size: 1.5rem;`}>The quick brown fox jumps over 123.</p>
      <div class="small fg-3 text-break">${tokenValue(name)}</div>
    </div>`
  )}</div>`;
}

export function tokenTable(tokens) {
  return html`<table>
    <thead><tr><th scope="col">Token</th><th scope="col">Value</th><th scope="col">Use</th></tr></thead>
    <tbody>${tokens.map(
      ([name, use]) => html`<tr>
        <th scope="row"><code>${name}</code></th>
        <td><code>${tokenValue(name)}</code></td>
        <td>${use}</td>
      </tr>`
    )}</tbody>
  </table>`;
}

// Heading levels rendered with the current typography tokens.
export function headingScale() {
  const heading = (tag) => Object.assign(document.createElement(tag), {className: "m-0", textContent: "Design system heading"});
  return html`<div>${["h1", "h2", "h3", "h4", "h5", "h6"].map(
    (tag) => html`<div class="border-bottom py-3 d-flex align-items-baseline gap-5">
      <code class="flex-shrink-0" style="width: 2rem">${tag}</code>
      ${heading(tag)}
    </div>`
  )}</div>`;
}

// Spacer scale: one bar per Bootstrap `--bs-spacer-*` step that is defined.
export function spacingScale() {
  const steps = Array.from({length: 13}, (_, i) => i + 1).filter((step) => tokenValue(`--bs-spacer-${step}`) !== "Not defined");
  return html`<div>${steps.map(
    (step) => html`<div class="d-flex align-items-center gap-5 py-1">
      <code class="flex-shrink-0" style="width: 8rem">--bs-spacer-${step}</code>
      <div class="bg-inverse" style=${`height: 0.75rem; width: var(--bs-spacer-${step})`}></div>
      <span class="small fg-3">${tokenValue(`--bs-spacer-${step}`)}</span>
    </div>`
  )}</div>`;
}

// Live viewport width, to see which breakpoint file is active.
export function currentBreakpoint(breakpoints) {
  const label = html`<strong></strong>`;
  const update = () => {
    const width = innerWidth;
    const active = [...breakpoints].reverse().find(({min}) => width >= min);
    label.textContent = `${active.name} (${width}px)`;
  };
  update();
  addEventListener("resize", update);
  return html`<p class="mb-0">Current breakpoint: ${label}</p>`;
}
