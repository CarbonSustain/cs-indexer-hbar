const nock = require("nock");
import { createClient } from "../src/client";
import { GlobalIndexer } from "../src/indexer";

describe("GlobalIndexer", () => {
  const baseURL = "https://api.example.com";
  const client = createClient(baseURL, "testkey");
  const api = new GlobalIndexer(client);

  afterAll(() => nock.cleanAll());

  it("fetches landing analytics", async () => {
    nock(baseURL).get("/indexer/landing").reply(200, {
      registries: 5,
      methodologies: 10,
      totalDocuments: 100,
      totalIssuance: 200
    });
    const data = await api.getLandingAnalytics();
    expect(data).toEqual({
      registries: 5,
      methodologies: 10,
      totalDocuments: 100,
      totalIssuance: 200
    });
  });
});

