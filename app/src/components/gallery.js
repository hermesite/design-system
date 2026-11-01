import {html} from "npm:htl";

// Reference implementation of the gallery component. Its styles live in the design system
// (src/components/gallery.css); this script only builds the markup and the behavior.
const SMALL_SCREEN = "(max-width: 640px)";

/**
 * Minimalist image gallery. Navigation (arrows + thumbnails) sits above a
 * slider that shows the current slide centered at its natural proportions,
 * with the neighbouring slides peeking in on both sides.
 * Supports thumbnails, prev/next buttons, clicking a neighbour, swipe and arrow keys.
 * @param {{src: string, alt?: string, caption?: string}[]} slides
 */
export function gallery(slides) {
  const mq = window.matchMedia(SMALL_SCREEN);
  const container = html`<div></div>`;
  const render = () => container.replaceChildren(mq.matches ? list(slides) : slider(slides));
  mq.addEventListener("change", render);
  render();
  return container;
}

// Small screens: no slider, just every image followed by its caption.
function list(slides) {
  return html`<div class="gallery gallery-list d-flex flex-column gap-7">${slides.map(
    ({src, alt, caption}) => html`<figure class="m-0">
      <img class="d-block mx-auto img-fluid" src=${src} alt=${alt ?? caption ?? ""} loading="lazy" />
      ${caption ? html`<figcaption class="gallery-caption">${caption}</figcaption>` : ""}
    </figure>`
  )}</div>`;
}

function slider(slides) {
  let index = 0;
  let swiped = false;

  const prev = html`<button class="gallery-btn btn-outline theme-secondary rounded-0 d-inline-flex align-items-center justify-content-center flex-shrink-0" type="button" aria-label="Previous slide">‹</button>`;
  const next = html`<button class="gallery-btn btn-outline theme-secondary rounded-0 d-inline-flex align-items-center justify-content-center flex-shrink-0" type="button" aria-label="Next slide">›</button>`;
  const thumbEls = slides.map(
    ({src, alt, caption}, i) => html`<button class="gallery-thumb flex-shrink-0 p-0 border-0 bg-transparent" type="button" aria-label=${`Go to slide ${i + 1}`}>
      <img src=${src} alt=${alt ?? caption ?? ""} loading="lazy" draggable="false" />
    </button>`
  );
  const thumbs = html`<div class="gallery-thumbs d-flex flex-fill gap-3 p-1 overflow-x-auto">${thumbEls}</div>`;

  const slideEls = slides.map(
    ({src, alt, caption}) => html`<figure class="gallery-slide d-flex flex-column align-items-center flex-shrink-0 position-relative m-0">
      <div class="gallery-frame d-flex"><img src=${src} alt=${alt ?? caption ?? ""} draggable="false" /></div>
      <figcaption class="gallery-caption">${caption ?? ""}</figcaption>
    </figure>`
  );
  const track = html`<div class="gallery-track position-relative d-flex align-items-start gap-5">${slideEls}</div>`;
  const viewport = html`<div class="gallery-viewport overflow-hidden mt-5">${track}</div>`;

  const layout = () => {
    const active = slideEls[index];
    const offset = viewport.clientWidth / 2 - (active.offsetLeft + active.offsetWidth / 2);
    track.style.transform = `translateX(${offset}px)`;
  };

  const goTo = (i) => {
    index = Math.max(0, Math.min(slides.length - 1, i));
    slideEls.forEach((el, n) => el.setAttribute("aria-current", String(n === index)));
    thumbEls.forEach((el, n) => el.setAttribute("aria-current", String(n === index)));
    prev.disabled = index === 0;
    next.disabled = index === slides.length - 1;
    const t = thumbEls[index];
    thumbs.scrollTo({left: t.offsetLeft - (thumbs.clientWidth - t.offsetWidth) / 2, behavior: "smooth"});
    layout();
  };

  prev.onclick = () => goTo(index - 1);
  next.onclick = () => goTo(index + 1);
  thumbEls.forEach((el, i) => (el.onclick = () => goTo(i)));
  slideEls.forEach((el, i) => {
    el.onclick = () => {
      if (!swiped) goTo(i);
    };
    el.querySelector("img").addEventListener("load", layout);
  });

  let startX = null;
  viewport.addEventListener("pointerdown", (e) => {
    startX = e.clientX;
    swiped = false;
  });
  viewport.addEventListener("pointerup", (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    startX = null;
    if (Math.abs(dx) > 40) {
      swiped = true;
      goTo(index + (dx < 0 ? 1 : -1));
    }
  });
  viewport.addEventListener("pointercancel", () => (startX = null));

  const root = html`<div class="gallery" tabindex="0" role="region" aria-roledescription="carousel" aria-label="Image gallery">
    <div class="gallery-nav d-flex align-items-center gap-5">${thumbs}</div>
    ${viewport}
  </div>`;

  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goTo(index - 1);
    else if (e.key === "ArrowRight") goTo(index + 1);
    else return;
    e.preventDefault();
  });

  // The first layout happens once attached; animate only after that.
  let first = true;
  new ResizeObserver(() => {
    layout();
    if (first) {
      first = false;
      requestAnimationFrame(() => track.setAttribute("data-ready", ""));
    }
  }).observe(viewport);

  goTo(0);
  return root;
}
