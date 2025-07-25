const express = require("express");
import { Request, Response } from "express"; // ✅ keep this line just for types

const dotenv = require("dotenv");
const axios = require("axios");
const { createClient } = require("./src/client");
const { GlobalIndexer } = require("./src/indexer");

dotenv.config();

const app = express();
app.use(express.json());

const client = createClient(process.env.BASE_URL, process.env.BEARER_TOKEN);
const indexer = new GlobalIndexer(client);

// POST /run to trigger your filter function
app.post("/search/documents", async (req: Request, res: Response) => {
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
        // value is definitely a string here
        keywords.push(...value.split(",").map((v: string) => v.trim()));
      } else if (Array.isArray(value)) {
        // value is an array of unknown types
        value.forEach((val) => {
          if (typeof val === "string") {
            keywords.push(...val.split(",").map((v: string) => v.trim()));
          }
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
