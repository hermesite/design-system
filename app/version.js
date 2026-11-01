import {readFileSync} from "node:fs";

const read = (path) => JSON.parse(readFileSync(new URL(path, import.meta.url), "utf8"));

// Single source of truth: the version of the design system package (../package.json).
export const info = {
  version: read("../package.json").version,
  bootstrap: read("../node_modules/bootstrap/package.json").version
};

export function versionBadge(className = "") {
  return `<span class="badge badge-outline theme-primary ${className}" title="Design system version">v${info.version}</span>`;
}
