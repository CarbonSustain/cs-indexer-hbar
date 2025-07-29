import express from "express";
import dotenv from "dotenv";
import axio from "axios";
import { createClient } from "./src/client.js";
import { GlobalIndexer } from "./src/indexer.js"
import { Request, Response } from "express"; // ✅ keep this line just for types

// Helper functions for validation and data processing
const ALLOWED_FILTER_KEYS = ["funding_target", "timeframe", "region", "project_type", "verification", "sdgs"];

function parseValueToArray(value: any): string[] {
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.map(v => String(v).trim()).filter(v => v.length > 0);
      } else {
        return [String(parsed).trim()];
      }
    } catch {
      return value.split(",").map((v: string) => v.trim()).filter((v: string) => v.length > 0);
    }
  } else if (Array.isArray(value)) {
    return value.map(v => String(v).trim()).filter(v => v.length > 0);
  } else if (value !== undefined && value !== null) {
    return [String(value).trim()];
  }
  return [];
}

function validateAndExtractFilters(body: any): any {
  const filters: any = {};
  
  for (const key of ALLOWED_FILTER_KEYS) {
    const value = body[key];
    if (value !== undefined && value !== null) {
      const parsedArray = parseValueToArray(value);
      if (parsedArray.length > 0) {
        filters[key] = parsedArray;
      }
    }
  }
  
  const hasFilters = Object.keys(filters).some(key => filters[key] && filters[key].length > 0);
  if (!hasFilters) {
    throw new Error("At least one filter must be provided from: funding_target, timeframe, region, project_type, verification, sdgs");
  }
  
  console.log("Filters:", filters);
  return filters;
}

// const { createClient } = require("./src/client");
// const { GlobalIndexer } = require("./src/indexer");

dotenv.config();

const app = express();
app.use(express.json());

const client = createClient(`${process.env.BASE_URL}`, `${process.env.BEARER_TOKEN}`);
const indexer = new GlobalIndexer(client);

app.post("/search/documents", async (req: any, res: any) => {
  try {
    const filters = validateAndExtractFilters(req.body);
    const result = await indexer.getDocumentsByKeywords(
      filters.funding_target || [],
      filters.timeframe || [],
      filters.region || [],
      filters.project_type || [],
      filters.verification || [],
      filters.sdgs || []
    );
    res.json(result);
  } catch (err: any) {
    console.error("Error in /search/documents:", err.message);
    const statusCode = err.message.includes("At least one filter") ? 400 : 500;
    res.status(statusCode).json({ error: err.message });
  }
});

app.get("/entities/vc-documents/:messageId", async (req: any, res: any) => {
  try {
    const messageId = req.params.messageId;
    const document = await indexer.getVcByMessageId(messageId);
    res.json(document);
  } catch (error: any) {
    console.error("Failed to get document:", error.message);
    res.status(500).json({ error: "Failed to get document" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
