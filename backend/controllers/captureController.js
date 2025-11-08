import Item from "../models/Item.js";
import { extractContent } from "../services/extractor.js";
import { generateEmbedding } from "../services/embeddingService.js";

export const captureContent = async (req, res) => {
  try {
    const { userId = 'demo_user', url, selectedHtml, userNote = '', typeHint = 'article' } = req.body;

    const extracted = await extractContent(url, selectedHtml, typeHint);
    const embedding = await generateEmbedding(extracted.text || userNote || extracted.title || '');

    const item = await Item.create({
      userId,
      type: typeHint,
      title: extracted.title || userNote || 'Untitled',
      url,
      content: { text: extracted.text || userNote },
      metadata: extracted.metadata || {},
      ocrText: extracted.ocrText || null,
      vectorId: embedding.id,
    });

    res.status(201).json({ success: true, item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Capture failed", error: String(err) });
  }
};
