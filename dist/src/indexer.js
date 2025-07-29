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
    async getDocumentsByKeywords(keywords = []) {
        var _a;
        if (!Array.isArray(keywords) || keywords.length === 0) {
            throw new Error("Keywords must be a non-empty array.");
        }
        const encodedKeywords = `[${keywords.map(k => `"${encodeURIComponent(k)}"`).join(",")}]`;
        // console.log(encodedKeywords)
        const resp = await this.client.get(`/entities/vc-documents?keywords=${encodedKeywords}`);
        // console.log("getting the VC",resp.data.items.data.items)
        // console.log(resp)
        const items = (_a = resp === null || resp === void 0 ? void 0 : resp.data) === null || _a === void 0 ? void 0 : _a.items;
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
        return items; // filter out nulls
    }
}
