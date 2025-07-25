import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import { createClient } from "./src/client";
import { GlobalIndexer } from "./src/indexer"; // ← adjust path if needed

dotenv.config();

const app = express();
app.use(express.json());

const client = createClient( ${process.env.BASE_URL}, ${process.env.BEARER_TOKEN});
const indexer = new GlobalIndexer(client);

// POST /run to trigger your filter function
app.post("/search/documents", async (req, res) => {
    try {
        // const filters: Record<string, string[]> = {};
    
        // for (const key in req.query) {
        //   const value = req.query[key];
    
        //   if (typeof value === "string") {
        //     filters[key] = value.split(",");
        //   } else if (Array.isArray(value)) {
        //     filters[key] = value.flatMap(v => v.split(","));
        //   }
        // }

        const keywords: string[] = [];

        for (const key in req.query) {
          const value = req.query[key];
    
          if (typeof value === "string") {
            keywords.push(...value.split(",").map(v => v.trim()));
          } else if (Array.isArray(value)) {
            value.forEach(val => {
              keywords.push(...val.split(",").map(v => v.trim()));
            });
          }
        }
    
        // Call your library method with the array
        const result = await indexer.getDocumentsByKeywords(keywords);
        res.json(result);
    // const result = await indexer.getDocumentsByKeywords(filters);
    // res.json({ result });
    // res.json({filters})
  } catch (err: any) {
    console.error("Error in /run:", err.message);
    res.status(500).json({ error: "Failed to fetch VC documents" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
