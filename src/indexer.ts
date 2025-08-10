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

export interface ProjectResponse {
  id: string;
  lastUpdate: number;
  topicId: string;
  consensusTimestamp: string;
  owner: string;
  uuid: string;
  status: string;
  type: string;
  action: string;
  lang: string;
  responseType: string;
  options: {
    issuer: string;
    relationships: any | null;
    documentStatus: string;
    encodedData: boolean;
  };
  analytics: {
    textSearch: string;
    policyId: string;
    schemaId: string;
    schemaName: string;
  };
  files: string[];
  documents: string[];
  topics: any[];
  tokens: any[];
  sequenceNumber: number;
  loaded: boolean;
  processedProjects: boolean;
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

  async fetchProjectsBasedOnSchema(schema: string, sdgs: string): Promise<ProjectResponse[]> {
    // Step 1: Build keywords array
    const keywords = [schema, sdgs];
    const encodedKeywords = encodeURIComponent(JSON.stringify(keywords));

    // Step 2: Call the indexer API to get a list of project items
    const resp = await this.client.get(`/entities/vc-documents?keywords=${encodedKeywords}`);
    const items = resp?.data?.items || [];
    const SchemaBasedProjects: ProjectResponse[] = items;

    return SchemaBasedProjects;
  }
  async fetchBasedOnSchemaID(schemaIds: string[]): Promise<ProjectResponse[]> {
    const SchemaBasedProjects: ProjectResponse[] = [];
    for(const id of schemaIds){
      const resp = await this.client.get(`/entities/vc-documents?analytics.schemaId=${encodeURIComponent(id)}`);
      const items = resp?.data?.items || [];
      SchemaBasedProjects.push(...items);
    }

    return SchemaBasedProjects;
  }


  async getDocumentsByKeywords(
    funding_target: string[] = [],
    timeframe: string[] = [],
    region: string[] = [],
    project_type: string[] = [],
    verification: string[] = [],
    sdgs: string[] = []
  ): Promise<any[]> {

    const submitProjects = await this.fetchProjectsBasedOnSchema('SubmitProject', 'sdg');
    const verifyProjects = await this.fetchProjectsBasedOnSchema('Verify Project', 'sdg');
    const ProjectSubmissionForm = await this.fetchProjectsBasedOnSchema('Project Submission Form','sdg');
    const GHGProjects = await this.fetchBasedOnSchemaID(['1733734487.531116964','1733906381.658350000']);
    
    const Projects = [...submitProjects, ...verifyProjects, ...GHGProjects, ...ProjectSubmissionForm];

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
    const useKeywordSearch = (
      keywords.length > 0 &&      
      sdgs.length > 0 &&         
      keywords.length > sdgs.length 
    );

    if (useKeywordSearch) {
      const resp = await this.client.get(`/entities/vc-documents?keywords=${encodeURIComponent(JSON.stringify(keywords))}`);
      const items = resp?.data?.items || [];
      const ProjectsBasedOnKeywords: ProjectResponse[] = items;
      console.log(ProjectsBasedOnKeywords.length)
      return ProjectsBasedOnKeywords;
    }
    else {
      const filteredWithCount: { item: ProjectResponse, count: number }[] = [];
      for (const item of Projects) {
        const textSearch = item?.analytics?.textSearch || '';

        const matchCount = filterProjectBySDGs(textSearch, sdgs);

        if (matchCount > 0) {
          filteredWithCount.push({ item, count: matchCount });
        }
      }
      filteredWithCount.sort((a, b) => b.count - a.count);
      const filteredItems = filteredWithCount.map(entry => entry.item);
      console.log(filteredItems.length)
      return filteredItems;

    }
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