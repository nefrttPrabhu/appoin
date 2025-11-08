function getMeta(){
  return {
    title: document.title,
    url: location.href,
    description: document.querySelector('meta[name="description"]')?.content
      || document.querySelector('meta[property="og:description"]')?.content || "",
    image: document.querySelector('meta[property="og:image"]')?.content || ""
  };
}
function getSelection(){ return window.getSelection()?.toString() || ""; }
function detectProduct(){
  const nodes = Array.from(document.querySelectorAll('*[class*="price"], [data-price], .a-price .a-offscreen, [itemprop="price"]'));
  const text = nodes.map(e => e.textContent?.trim()).find(t => t && /[$₹€£]\s?\d/.test(t));
  if(!text) return null;
  const num = parseFloat((text.match(/[\d,.]+/)?.[0]||"0").replace(/,/g,""));
  const currency = /₹/.test(text) ? "INR" : /\$/.test(text) ? "USD" : /€/.test(text) ? "EUR" : /£/.test(text) ? "GBP" : undefined;
  return { price:num, currency };
}

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse)=>{
  try{
    if(msg?.type==="getMeta") return sendResponse(getMeta());
    if(msg?.type==="getSelection") return sendResponse(getSelection());
    if(msg?.type==="detectProduct") return sendResponse(detectProduct());
  }catch(e){ console.error(e); }
});
