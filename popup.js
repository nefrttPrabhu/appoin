const msg = (t)=> document.getElementById("msg").textContent = t;

async function cfg() {
  return await chrome.storage.sync.get({ apiBase:"http://localhost:3000", jwt:"" });
}
async function post(payload){
  const { apiBase, jwt } = await cfg();
  if(!jwt) throw new Error("Set JWT in Options");
  const r = await fetch(`${apiBase}/api/bookmarks`, {
    method:"POST",
    headers:{ "Content-Type":"application/json", "Authorization":`Bearer ${jwt}` },
    body: JSON.stringify(payload)
  });
  const j = await r.json();
  if(!j.ok) throw new Error(j.error||"API error");
  return j;
}
async function activeTab(){ return (await chrome.tabs.query({active:true,currentWindow:true}))[0]; }

document.getElementById("saveSelection").onclick = async ()=>{
  try{
    const tab = await activeTab();
    const selection = await chrome.tabs.sendMessage(tab.id, {type:"getSelection"});
    const meta = await chrome.tabs.sendMessage(tab.id, {type:"getMeta"});
    await post({ kind:"article", url:meta.url, title:meta.title, description:(selection||"").slice(0,800), image:meta.image||undefined });
    msg("Selection saved ✓");
  }catch(e){ msg(e.message||"Error"); }
};

document.getElementById("savePage").onclick = async ()=>{
  try{
    const tab = await activeTab();
    const meta = await chrome.tabs.sendMessage(tab.id, {type:"getMeta"});
    const kind = /youtube\.com|youtu\.be/.test(meta.url) ? "video" : /arxiv\.org/.test(meta.url) ? "research" : "article";
    await post({ kind, url:meta.url, title:meta.title, description:meta.description||"", image:meta.image||undefined });
    msg("Page saved ✓");
  }catch(e){ msg(e.message||"Error"); }
};

document.getElementById("saveProduct").onclick = async ()=>{
  try{
    const tab = await activeTab();
    const meta = await chrome.tabs.sendMessage(tab.id, {type:"getMeta"});
    const product = await chrome.tabs.sendMessage(tab.id, {type:"detectProduct"});
    await post({ kind:"product", url:meta.url, title:meta.title, image:meta.image||undefined,
      metadata: product? { price:product.price, currency:product.currency } : {} });
    msg(product? `Product saved (~${product.currency} ${product.price}) ✓` : "Product saved ✓");
  }catch(e){ msg(e.message||"Error"); }
};

document.getElementById("saveVideo").onclick = async ()=>{
  try{
    const tab = await activeTab();
    const meta = await chrome.tabs.sendMessage(tab.id, {type:"getMeta"});
    await post({ kind:"video", url:meta.url, title:meta.title });
    msg("Video saved ✓");
  }catch(e){ msg(e.message||"Error"); }
};
