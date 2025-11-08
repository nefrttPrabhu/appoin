// Listens for capture request from popup and returns the selection + page HTML snippet.
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "capture") {
    const selection = window.getSelection().toString();
    // send a small HTML snapshot (body innerHTML) - be careful with very large pages.
    sendResponse({ selection, url: window.location.href, html: document.documentElement.innerHTML.slice(0, 200000) });
  }
});
