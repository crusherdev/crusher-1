import { IGlobalManager } from "@crusher-shared/lib/globals/interface";
import { BrowserContext, Page } from "playwright";
import nodeFetch from "node-fetch";

async function addRRWeb(browserContext: BrowserContext, page: Page, globals: IGlobalManager) {
    globals.set("events", []);

    const rrWebCode = await nodeFetch("https://cdn.jsdelivr.net/npm/rrweb@0.7.11/dist/rrweb.min.js").then(res => res.text());
    await page.exposeFunction('_replLog', (event) => {
        globals.get("events").push(event);
    });
}

export { addRRWeb };