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
export declare class GlobalIndexer {
    private client;
    constructor(client: AxiosInstance);
    getLandingAnalytics(): Promise<LandingAnalytics[]>;
    fullTextSearch(query: string, pageIndex?: number, pageSize?: number): Promise<any>;
    getSchemaById(messageId: string): Promise<any>;
    fetchProjectsBasedOnSchema(schema: string, sdgs: string): Promise<ProjectResponse[]>;
    fetchBasedOnSchemaID(schemaIds: string[]): Promise<ProjectResponse[]>;
    getDocumentsByKeywords(funding_target?: string[], timeframe?: string[], region?: string[], project_type?: string[], verification?: string[], sdgs?: string[]): Promise<any[]>;
    getVcByMessageId(messageId: string): Promise<any>;
}
