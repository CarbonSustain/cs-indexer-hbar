import express from "express";
import dotenv from "dotenv";
import { createClient } from "./src/client.js";
import { GlobalIndexer } from "./src/indexer.js";
dotenv.config();
const app = express();
app.use(express.json());
const client = createClient(`${process.env.BASE_URL}`, `${process.env.BEARER_TOKEN}`);
const indexer = new GlobalIndexer(client);
app.post("/search/documents", async (req, res) => {
    try {
        const { funding_target = [], timeframe = [], region = [], project_type = [], verification = [], sdgs = [] } = req.body;
        const result = await indexer.getDocumentsByKeywords(funding_target || [], timeframe || [], region || [], project_type || [], verification || [], sdgs || []);
        res.json(result);
    }
    catch (err) {
        console.error("Error in /search/documents:", err.message);
        const statusCode = err.message.includes("At least one filter") ? 400 : 500;
        res.status(statusCode).json({ error: err.message });
    }
});
app.get("/entities/vc-documents/:messageId", async (req, res) => {
    try {
        const messageId = req.params.messageId;
        const document = await indexer.getVcByMessageId(messageId);
        res.json(document);
    }
    catch (error) {
        console.error("Failed to get document:", error.message);
        res.status(500).json({ error: "Failed to get document" });
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
