import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import { createClient } from "./src/client";
import { GlobalIndexer } from "./src/indexer"; // ← adjust path if needed

dotenv.config();

const app = express();
app.use(express.json());

const client = createClient( `${process.env.BASE_URL}`, `${process.env.BEARER_TOKEN}`);
const indexer = new GlobalIndexer(client);

  app.post("/search/documents", async (req, res) => {
    try {
      const keywords: string[] = [];
      const allowedKeys = ["region", "project_type", "verification", "sdgs"];
      for (const key of allowedKeys) {

        const value = req.body[key];
        // console.log(req.body)
        // if (typeof val === "string") {
        //   keywords.push(val.trim());
        // } else if (Array.isArray(val)) {
        //   keywords.push(...val.map(v => v.trim()));
        // }
        // console.log(keywords)
        // const value = req.query[key];
        if (typeof value === "string") {
          try {
            // Try to parse it as JSON array
            const parsed = JSON.parse(value);
            if (Array.isArray(parsed)) {
              parsed.forEach(v => keywords.push(String(v)));
            } else {
              keywords.push(String(parsed));
            }
          } catch {
            // Fallback: comma split
            keywords.push(...value.split(",").map(v => v.trim()));
          }
        } else if (Array.isArray(value)) {
          value.forEach(val => {
            try {
              const parsed = JSON.parse(String(val));
              if (Array.isArray(parsed)) {
                parsed.forEach(v => keywords.push(String(v)));
              } else {
                keywords.push(String(parsed));
              }
            } catch {
              keywords.push(...String(val).split(",").map(v => v.trim()));
            }
          });
        }
      }
  
      // console.log("Final keywords:", keywords);
      const result = await indexer.getDocumentsByKeywords(keywords);
      // console.log(result)
      res.json(result);
    } catch (err: any) {
      console.error("Error in /search/documents:", err.message);
      res.status(500).json({ error: "Failed to fetch VC documents" });
    }
  });
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
