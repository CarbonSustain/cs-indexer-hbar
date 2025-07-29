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
    async getDocumentsByKeywords(funding_target = [], timeframe = [], region = [], project_type = [], verification = [], sdgs = []) {
        var _a, _b;
        // ...region,
        // ...project_type,
        // ...verification,
        const keywords = [
            ...region,
            ...project_type,
            ...verification,
            ...sdgs
        ].filter(Boolean); // Remove any falsy entries
        // 2. Validate
        if (!Array.isArray(keywords) || keywords.length === 0) {
            throw new Error("At least one filter (funding_target, timeframe, region, project_type, verification, sdgs) must be non-empty.");
        }
        // 3. Format as encoded JSON array of strings
        const encodedKeywords = `[${keywords.map(k => `"${encodeURIComponent(k)}"`).join(",")}]`;
        const resp = await this.client.get(`/entities/vc-documents?keywords=${encodedKeywords}&schemaType=VerifyProject`);
        const items = ((_a = resp === null || resp === void 0 ? void 0 : resp.data) === null || _a === void 0 ? void 0 : _a.items) || [];
        console.log(items.length);
        const filteredItems = [];
        for (const item of items) {
            // console.log(item)
            const textSearch = ((_b = item === null || item === void 0 ? void 0 : item.analytics) === null || _b === void 0 ? void 0 : _b.textSearch) || '';
            const matches = filterProjectBySDGs(textSearch, sdgs);
            // console.log(matches)
            const messageId = item === null || item === void 0 ? void 0 : item.consensusTimestamp;
            if (matches) {
                filteredItems.push(item);
            }
        }
        console.log(items.length);
        return filteredItems;
        // Extract SDGs from filters
        // const sdgsArray: string[] = sdgs || [];
        // for (const item of items) {
        //   const messageId = item?.consensusTimestamp;
        //   if (!messageId) continue;
        //   try {
        //     const detailResp = await this.client.get(`/entities/vc-documents/${messageId}`);
        //     const fullDoc = detailResp?.data;
        //     const documentString = fullDoc?.item?.documents?.[0];
        //     let parsedDoc;
        //     if (JSON.parse(documentString) !== undefined) {
        //       try {
        //         parsedDoc = JSON.parse(documentString);
        //       } catch (err) {
        //         console.error("Invalid document JSON:", err);
        //       }
        //     }
        //     // Filter by SDGs using the extracted array
        //     const matches = filterProjectBySDGs(parsedDoc, sdgsArray);
        //     if (matches) {
        //       filtered_items.push(parsedDoc);
        //     }
        //   } catch (err) {
        //     console.error(`Failed to fetch document with timestamp ${messageId}:`, err);
        //   }
        // }
        // return filtered_items;
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
