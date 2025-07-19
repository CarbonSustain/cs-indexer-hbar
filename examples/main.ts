import { createClient } from "../src/client";
import { GlobalIndexer } from "../src/indexer";

const BASE_URL = "https://indexer.guardianservice.app/api/v1/testnet";
const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NzU4YWFjY2U1MmMwODliZDdhNGMyZSIsIm5hbWUiOiJzYWlfc3JpamEiLCJob3N0IjoiaW5kZXhlci5ndWFyZGlhbnNlcnZpY2UuYXBwIiwiaWF0IjoxNzUyNTM4NTE3LCJleHAiOjE3NTM3NDgxMTcsImlzcyI6Ik1HUyJ9.WtWbBeg2XBJVIES22q2WAXyZBj6XTYQ-p1eSakBiBLM"; // <-- Replace with your actual token

async function main() {
  const client = createClient(BASE_URL, BEARER_TOKEN);
  const indexer = new GlobalIndexer(client);

  // Example: Fetch landing analytics
  const analytics = await indexer.getLandingAnalytics();
  console.log("Landing Analytics:", analytics);

  // Example: Full text search
  const searchResults = await indexer.fullTextSearch("carbon");
  console.log("Search Results:", searchResults);

  // Example: Get schema by ID
  // const schema = await indexer.getSchemaById("your-message-id");
  // console.log("Schema:", schema);
}

main().catch(console.error);
