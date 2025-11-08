async function cfg(){ return chrome.storage.sync.get({ apiBase:"http://localhost:3000", jwt:"" }); }
async function post(p){
  const { apiBase, jwt } = await cfg();
  const r = await fetch(`${apiBase}/api/bookmarks`, {
    method:"POST", headers:{ "Content-Type":"application/json", "Authorization":`Bearer ${jwt}` },
    body: JSON.stringify(p)
  });
  return r.json();
}

chrome.runtime.onInstalled.addListener(()=>{
  chrome.contextMenus.create({ id:"save-selection", title:"Save selection to Synapse", contexts:["selection"] });
  chrome.contextMenus.create({ id:"save-page", title:"Save page to Synapse", contexts:["page"] });
  chrome.contextMenus.create({ id:"detect-product", title:"Detect product & save", contexts:["page"] });
});

chrome.contextMenus.onClicked.addListener(async (info, tab)=>{
  if(!tab?.id) return;
  if(info.menuItemId==="save-selection" && info.selectionText){
    const [{ result }] = await chrome.scripting.executeScript({
      target:{ tabId: tab.id },
      func: () => ({ title: document.title, url: location.href,
        image: document.querySelector('meta[property="og:image"]')?.content || "",
        description: document.querySelector('meta[name="description"]')?.content || "" })
    });
    await post({ kind:"article", url: result.url, title: result.title, description: info.selectionText.slice(0,800), image: result.image||undefined });
  }
  if(info.menuItemId==="save-page"){
    const [{ result }] = await chrome.scripting.executeScript({
      target:{ tabId: tab.id },
      func: () => ({ title: document.title, url: location.href,
        image: document.querySelector('meta[property="og:image"]')?.content || "",
        description: document.querySelector('meta[name="description"]')?.content || "" })
    });
    const kind = /youtube\.com|youtu\.be/.test(result.url) ? "video" : /arxiv\.org/.test(result.url) ? "research" : "article";
    await post({ kind, url: result.url, title: result.title, description: result.description||"", image: result.image||undefined });
  }
  if(info.menuItemId==="detect-product"){
    const [{ result }] = await chrome.scripting.executeScript({
      target:{ tabId: tab.id },
      func: () => {
        const priceEl = Array.from(document.querySelectorAll('*[class*="price"], [data-price], .a-price .a-offscreen, [itemprop="price"]'));
        const text = priceEl.map(e => e.textContent?.trim()).find(t => t && /[$₹€£]\s?\d/.test(t));
        const price = text ? parseFloat((text.match(/[\d,.]+/)?.[0]||"0").replace(/,/g,"")) : null;
        const currency = text ? ( /₹/.test(text)?"INR" : /\$/.test(text)?"USD" : /€/.test(text)?"EUR" : /£/.test(text)?"GBP" : undefined ) : undefined;
        return { title: document.title, url: location.href, price, currency,
                 image: document.querySelector('meta[property="og:image"]')?.content || "" };
      }
    });
    await post({ kind:"product", url: result.url, title: result.title, image: result.image||undefined,
      metadata: (result.price? { price:result.price, currency:result.currency } : {}) });
  }
});
