import { AxiosInstance } from "axios";

export interface LandingAnalytics {
  date: string;
  registries: number;
  methodologies: number;
  projects: number;
  totalIssuance: number;
  totalSerialized: number;
  totalFungible: number;
  id: string;
}

export class GlobalIndexer {
  constructor(private client: AxiosInstance) {}

  async getLandingAnalytics(): Promise<LandingAnalytics[]> {
    const resp = await this.client.get("/landing/analytics");
    return resp.data;
  }

  async fullTextSearch(query: string, pageIndex = 0, pageSize = 10) {
    const resp = await this.client.get("/search", {
      params: { search: query, pageIndex, pageSize }
    });
    return resp.data;
  }

  async getSchemaById(messageId: string) {
    const resp = await this.client.get(`/entities/schemas/${encodeURIComponent(messageId)}`);
    return resp.data;
  }

  // ...add more per documentation e.g. getPolicies(), getTokens(), etc.
}

