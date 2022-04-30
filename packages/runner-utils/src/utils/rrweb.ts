import { IGlobalManager } from "@crusher-shared/lib/globals/interface";
import { BrowserContext, Page } from "playwright";
import nodeFetch from "node-fetch";

async function addRRWeb(browserContext: BrowserContext, page: Page, globals: IGlobalManager) {
    globals.set("events", []);

    const rrWebCode = await nodeFetch("https://cdn.jsdelivr.net/npm/rrweb@0.7.14/dist/rrweb.min.js").then(res => res.text());
    await page.exposeFunction('_replLog', (event) => {
        globals.get("events").push(event);
    });
      await page.evaluate(`;${rrWebCode}
        window.__IS_RECORDING__ = true
        rrweb.record({
          emit: event => window._replLog(event),
          recordCanvas: true,
          collectFonts: true
        });
      `);
      page.on('framenavigated', async (frame) => {
        if (frame === page.mainFrame()) {
        const isRecording = await page.evaluate('window.__IS_RECORDING__');
        if (!isRecording) {
          await page.evaluate(`;${rrWebCode}
            window.__IS_RECORDING__ = true
            rrweb.record({
              emit: event => window._replLog(event),
              recordCanvas: true,
              collectFonts: true,
              inlineImages: true
            });
          `);
        }
    }
      });
}

export { addRRWeb };