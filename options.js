async function load() {
  const { apiBase, jwt } = await chrome.storage.sync.get({ apiBase: "http://localhost:3000", jwt: "" });
  apiBaseEl.value = apiBase; jwtEl.value = jwt;
}
const apiBaseEl = document.getElementById("apiBase");
const jwtEl = document.getElementById("jwt");
document.getElementById("save").onclick = async () => {
  await chrome.storage.sync.set({ apiBase: apiBaseEl.value.trim(), jwt: jwtEl.value.trim() });
  document.getElementById("status").textContent = "Saved ✓";
};
load();
