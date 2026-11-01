import {info} from "../../version.js";

// Versions shown by the pages, read from the package files at build time.
process.stdout.write(JSON.stringify(info));
