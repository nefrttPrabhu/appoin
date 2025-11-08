document.getElementById("saveBtn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { action: "capture" }, async (data) => {
    if (!data) {
      document.getElementById('status').innerText = 'No response from page (some pages block scripts).';
      return;
    }
    const payload = {
      userId: 'demo_user',
      url: data.url,
      selectedHtml: data.html,
      typeHint: 'article'
    };
    try {
      const resp = await fetch('http://localhost:5000/api/v1/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (resp.ok) {
        document.getElementById('status').innerText = 'Saved to Synapse ✅';
      } else {
        document.getElementById('status').innerText = 'Save failed';
      }
    } catch (err) {
      document.getElementById('status').innerText = 'Error: ' + err.message;
    }
  });
});
