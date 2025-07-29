import { AxiosInstance } from "axios";
import { filterProjectBySDGs } from "./matchProject.js"
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
  constructor(private client: AxiosInstance) { }

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

  async getDocumentsByKeywords(
    funding_target: string[] = [],
    timeframe: string[] = [],
    region: string[] = [],
    project_type: string[] = [],
    verification: string[] = [],
    sdgs: string[] = []
  ): Promise<any[]> {

    const keywords: string[] = [
      ...region,
      ...project_type,
      ...verification,
      ...sdgs
    ].filter(Boolean);

    // 2. Validate
    if (!Array.isArray(keywords) || keywords.length === 0) {
      throw new Error("At least one filter (funding_target, timeframe, region, project_type, verification, sdgs) must be non-empty.");
    }

    const encodedKeywords = `[${keywords.map(k => `"${encodeURIComponent(k)}"`).join(",")}]`;
    const resp = await this.client.get(`/entities/vc-documents?keywords=${encodedKeywords}&schemaType=VerifyProject`);
    const items: any[] = resp?.data?.items || [];

    const filteredItems = [];
    for (const item of items) {

      const textSearch = item?.analytics?.textSearch || '';
      const matches = filterProjectBySDGs(textSearch, sdgs);

      if (matches) {
        filteredItems.push(item)
      }
    }
    return filteredItems;
  }

  async getVcByMessageId(messageId: string): Promise<any> {
    if (!messageId) {
      throw new Error("Message ID is required.");
    }

    try {
      const resp = await this.client.get(`/entities/vc-documents/${messageId}`);
      const fullDoc = resp?.data;

      if (!fullDoc) {
        throw new Error(`No document found for message ID: ${messageId}`);
      }

      console.log(`Successfully retrieved document for message ID: ${messageId}`);
      return fullDoc;
    } catch (err) {
      console.error(`Failed to fetch document with message ID ${messageId}:`, err);
      throw err;
    }
  }
}