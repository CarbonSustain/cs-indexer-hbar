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
    async getDocumentsByKeywords(filters) {
        var _a;
        // 1. Extract relevant filters into a flat string array
        const { region = [], project_type = [], verification = [], sdgs = [] } = filters;
        const keywords = [
            ...region,
            ...project_type,
            ...verification,
            ...sdgs
        ].filter(Boolean); // Remove any falsy entries
        // 2. Validate
        if (!Array.isArray(keywords) || keywords.length === 0) {
            throw new Error("At least one filter (region, project_type, verification, sdgs) must be non-empty.");
        }
        // 3. Format as encoded JSON array of strings
        const encodedKeywords = `[${keywords.map(k => `"${encodeURIComponent(k)}"`).join(",")}]`;
        // 4. Call indexer API
        const resp = await this.client.get(`/entities/vc-documents?keywords=${encodedKeywords}`);
        const items = ((_a = resp === null || resp === void 0 ? void 0 : resp.data) === null || _a === void 0 ? void 0 : _a.items) || [];
        return items;
    }
}
