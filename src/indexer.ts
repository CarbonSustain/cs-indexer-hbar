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

  async getDocumentsByKeywords(keywords: string[] = []): Promise<any[]>{
    if (!Array.isArray(keywords) || keywords.length === 0) {
        throw new Error("Keywords must be a non-empty array.");
    }

    const encodedKeywords = `[${keywords.map(k => `"${encodeURIComponent(k)}"`).join(",")}]`;
    // console.log(encodedKeywords)
    const resp = await this.client.get(`/entities/vc-documents?keywords=${encodedKeywords}`);
    // console.log("getting the VC",resp.data.items.data.items)
    // console.log(resp)
    const items: any[] = resp?.data?.items;
    // console.log(items)
    // const documents = await Promise.all(items.map(async (item: any) => {
    //     const timestamp = item.consensusTimestamp;
    //     if (!timestamp) return null;

        // try {
        //     const docResp = await this.client.get(`/entities/vc-documents/${timestamp}`);
        //     const docString = docResp.data?.item?.documents?.[0];
        //     if (!docString) return null;

        //     try {
        //         return JSON.parse(docString);
        //     } catch (parseErr) {
        //         console.error(`Error parsing document for ${timestamp}:`, parseErr instanceof Error ? parseErr.message : parseErr);
        //         return null;
        //     }
        // } catch (err) {
        //     if (err instanceof Error) {
        //         console.error(`Error fetching document for ${timestamp}:`, err.message);
        //     } else {
        //         console.error(`Error fetching document for ${timestamp}:`, err);
        //     }
        //     return null;
        // }
    // }));
 
    return items // filter out nulls
}


  // ...add more per documentation e.g. getPolicies(), getTokens(), etc.
}

