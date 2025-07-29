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
export declare class GlobalIndexer {
    private client;
    constructor(client: AxiosInstance);
    getLandingAnalytics(): Promise<LandingAnalytics[]>;
    fullTextSearch(query: string, pageIndex?: number, pageSize?: number): Promise<any>;
    getSchemaById(messageId: string): Promise<any>;
    getDocumentsByKeywords(keywords?: string[]): Promise<any[]>;
}
