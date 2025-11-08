import axios from "axios";
import * as cheerio from "cheerio";

export const extractContent = async (url, html, type) => {
  try {
    if (html) {
      const $ = cheerio.load(html);
      const title = $("title").text() || "Untitled";
      // naive text extraction for prototype
      const text = $("article").text().trim() || $("body").text().trim();
      return { title, text: text.slice(0, 20000), metadata: { source: url, tags: [type] } };
    }
    if (!url) return { title: "Untitled", text: "", metadata: {} };
    const { data } = await axios.get(url, { timeout: 8000 });
    const $ = cheerio.load(data);
    const title = $("title").text() || "";
    const text = $("article").text().trim() || $("body").text().trim();
    return { title, text: text.slice(0, 20000), metadata: { source: url } };
  } catch (err) {
    console.warn("extractContent failed:", err.message);
    return { title: "Untitled", text: "", metadata: {} };
  }
};
