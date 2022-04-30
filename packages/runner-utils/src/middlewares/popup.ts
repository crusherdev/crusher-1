import { BrowserContext, Page } from "playwright";

function handlePopup(page: Page, browserContext: BrowserContext) {
	page.on("popup", async (popup) => {
		const popupUrl = await popup.url();
		console.log("Popup is opening", popupUrl);

		page.evaluate('window.location.href = "' + popupUrl + '"');
		const pages = await browserContext.pages();
		for (let i = 2; i < pages.length; i++) {
			await pages[i].close();
		}
	});
}

export { handlePopup };
