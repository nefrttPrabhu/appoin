import crypto from "crypto";

// Prototype placeholder for embeddings.
// Replace this with real vector DB + model integration later.
export const generateEmbedding = async (text) => {
  const hash = crypto.createHash("sha256").update(text || "").digest("hex");
  // returns a fake id and a tiny vector for demonstration (not used by server)
  return { id: `vec_${hash.slice(0,8)}`, vector: Array.from({length:8}, ()=>Math.random()) };
};
