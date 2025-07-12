import { AxiosInstance } from "axios";

export interface LandingAnalytics {
  registries: number;
  methodologies: number;
  totalDocuments: number;
  totalIssuance: number;
}

export class GlobalIndexer {
  constructor(private client: AxiosInstance) {}

  async getLandingAnalytics(): Promise<LandingAnalytics> {
    const resp = await this.client.get("/indexer/landing");
    return resp.data;
  }

  async fullTextSearch(query: string, page = 1, size = 10) {
    const resp = await this.client.get("/indexer/search", {
      params: { q: query, page, size }
    });
    return resp.data;
  }

  async getSchemaById(messageId: string) {
    const resp = await this.client.get(`/indexer/schemas/${encodeURIComponent(messageId)}`);
    return resp.data;
  }

  // ...add more per documentation e.g. getPolicies(), getTokens(), etc.
}

