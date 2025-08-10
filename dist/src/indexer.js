import { filterProjectBySDGs } from "./matchProject.js";
export class GlobalIndexer {
    constructor(client) {
        this.client = client;
    }
    async getLandingAnalytics() {
        const resp = await this.client.get("/landing/analytics");
        return resp.data;
    }
    async fullTextSearch(query, pageIndex = 0, pageSize = 10) {
        const resp = await this.client.get("/search", {
            params: { search: query, pageIndex, pageSize }
        });
        return resp.data;
    }
    async getSchemaById(messageId) {
        const resp = await this.client.get(`/entities/schemas/${encodeURIComponent(messageId)}`);
        return resp.data;
    }
    async fetchProjectsBasedOnSchema(schema, sdgs) {
        var _a;
        // Step 1: Build keywords array
        const keywords = [schema, sdgs];
        const encodedKeywords = encodeURIComponent(JSON.stringify(keywords));
        // Step 2: Call the indexer API to get a list of project items
        const resp = await this.client.get(`/entities/vc-documents?keywords=${encodedKeywords}`);
        const items = ((_a = resp === null || resp === void 0 ? void 0 : resp.data) === null || _a === void 0 ? void 0 : _a.items) || [];
        const SchemaBasedProjects = items;
        return SchemaBasedProjects;
    }
    async fetchBasedOnSchemaID(schemaIds) {
        var _a;
        const SchemaBasedProjects = [];
        for (const id of schemaIds) {
            const resp = await this.client.get(`/entities/vc-documents?analytics.schemaId=${encodeURIComponent(id)}`);
            const items = ((_a = resp === null || resp === void 0 ? void 0 : resp.data) === null || _a === void 0 ? void 0 : _a.items) || [];
            SchemaBasedProjects.push(...items);
        }
        return SchemaBasedProjects;
    }
    async getDocumentsByKeywords(funding_target = [], timeframe = [], region = [], project_type = [], verification = [], sdgs = []) {
        var _a, _b;
        const submitProjects = await this.fetchProjectsBasedOnSchema('SubmitProject', 'sdg');
        const verifyProjects = await this.fetchProjectsBasedOnSchema('Verify Project', 'sdg');
        const ProjectSubmissionForm = await this.fetchProjectsBasedOnSchema('Project Submission Form', 'sdg');
        const GHGProjects = await this.fetchBasedOnSchemaID(['1733734487.531116964', '1733906381.658350000']);
        const Projects = [...submitProjects, ...verifyProjects, ...GHGProjects, ...ProjectSubmissionForm];
        const keywords = [
            ...region,
            ...project_type,
            ...verification,
            ...sdgs
        ].filter(Boolean);
        // 2. Validate
        if (!Array.isArray(keywords) || keywords.length === 0) {
            throw new Error("At least one filter (funding_target, timeframe, region, project_type, verification, sdgs) must be non-empty.");
        }
        const useKeywordSearch = (keywords.length > 0 &&
            sdgs.length > 0 &&
            keywords.length > sdgs.length);
        if (useKeywordSearch) {
            const resp = await this.client.get(`/entities/vc-documents?keywords=${encodeURIComponent(JSON.stringify(keywords))}`);
            const items = ((_a = resp === null || resp === void 0 ? void 0 : resp.data) === null || _a === void 0 ? void 0 : _a.items) || [];
            const ProjectsBasedOnKeywords = items;
            console.log(ProjectsBasedOnKeywords.length);
            return ProjectsBasedOnKeywords;
        }
        else {
            const filteredWithCount = [];
            for (const item of Projects) {
                const textSearch = ((_b = item === null || item === void 0 ? void 0 : item.analytics) === null || _b === void 0 ? void 0 : _b.textSearch) || '';
                const matchCount = filterProjectBySDGs(textSearch, sdgs);
                if (matchCount > 0) {
                    filteredWithCount.push({ item, count: matchCount });
                }
            }
            filteredWithCount.sort((a, b) => b.count - a.count);
            const filteredItems = filteredWithCount.map(entry => entry.item);
            console.log(filteredItems.length);
            return filteredItems;
        }
    }
    async getVcByMessageId(messageId) {
        if (!messageId) {
            throw new Error("Message ID is required.");
        }
        try {
            const resp = await this.client.get(`/entities/vc-documents/${messageId}`);
            const fullDoc = resp === null || resp === void 0 ? void 0 : resp.data;
            if (!fullDoc) {
                throw new Error(`No document found for message ID: ${messageId}`);
            }
            console.log(`Successfully retrieved document for message ID: ${messageId}`);
            return fullDoc;
        }
        catch (err) {
            console.error(`Failed to fetch document with message ID ${messageId}:`, err);
            throw err;
        }
    }
}
