"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  GlobalIndexer: () => GlobalIndexer,
  createClient: () => createClient
});
module.exports = __toCommonJS(index_exports);

// src/client.ts
var import_axios = __toESM(require("axios"), 1);
function createClient(baseURL, apiKey) {
  const instance = import_axios.default.create({
    baseURL,
    headers: apiKey ? { Authorization: `Bearer ${apiKey}` } : void 0
  });
  return instance;
}

// src/sdg_keywords.ts
var SDG_KEYWORDS = {
  "SDG1_No_Poverty": {
    elsevier_keywords: [
      "poverty",
      "income inequality",
      "economic vulnerability",
      "social safety net",
      "minimum wage",
      "unemployment",
      "financial inclusion"
    ],
    auckland_keywords: [
      "poverty eradication",
      "multidimensional poverty",
      "social protection",
      "basic income"
    ]
  },
  "SDG2_Zero_Hunger": {
    elsevier_keywords: [
      "food security",
      "malnutrition",
      "agricultural productivity",
      "crop yield",
      "sustainable agriculture",
      "nutrition deficiency"
    ],
    auckland_keywords: [
      "hunger reduction",
      "undernourishment",
      "small-scale farmers",
      "food accessibility"
    ]
  },
  "SDG3_Good_Health_and_Wellbeing": {
    elsevier_keywords: [
      "public health",
      "healthcare access",
      "mental health",
      "maternal mortality",
      "vaccination",
      "communicable diseases",
      "noncommunicable diseases"
    ],
    auckland_keywords: [
      "health outcomes",
      "preventive care",
      "universal health coverage",
      "child mortality"
    ]
  },
  "SDG4_Quality_Education": {
    elsevier_keywords: [
      "education access",
      "literacy",
      "early childhood education",
      "STEM education",
      "higher education",
      "inclusive education"
    ],
    auckland_keywords: [
      "educational equity",
      "lifelong learning",
      "teacher training",
      "digital literacy"
    ]
  },
  "SDG5_Gender_Equality": {
    elsevier_keywords: [
      "gender equality",
      "women empowerment",
      "gender-based violence",
      "equal pay",
      "female leadership",
      "reproductive rights"
    ],
    auckland_keywords: [
      "gender discrimination",
      "gender parity",
      "women in STEM",
      "female education"
    ]
  },
  "SDG6_Clean_Water_and_Sanitation": {
    elsevier_keywords: [
      "clean water",
      "sanitation",
      "wastewater treatment",
      "water scarcity",
      "water quality",
      "safe drinking water"
    ],
    auckland_keywords: [
      "hygiene access",
      "water infrastructure",
      "water conservation",
      "WASH services"
    ]
  },
  "SDG7_Affordable_and_Clean_Energy": {
    elsevier_keywords: [
      "renewable energy",
      "solar power",
      "wind energy",
      "clean energy access",
      "energy efficiency",
      "sustainable energy"
    ],
    auckland_keywords: [
      "off-grid energy",
      "energy poverty",
      "green technology",
      "bioenergy"
    ]
  },
  "SDG8_Decent_Work_and_Economic_Growth": {
    elsevier_keywords: [
      "economic growth",
      "decent work",
      "employment",
      "job creation",
      "informal economy",
      "labor rights"
    ],
    auckland_keywords: [
      "youth unemployment",
      "inclusive growth",
      "productivity",
      "entrepreneurship"
    ]
  },
  "SDG9_Industry_Innovation_and_Infrastructure": {
    elsevier_keywords: [
      "infrastructure",
      "sustainable industry",
      "innovation",
      "technology development",
      "resilient infrastructure",
      "R&D"
    ],
    auckland_keywords: [
      "digital infrastructure",
      "industrialization",
      "tech startups",
      "smart manufacturing"
    ]
  },
  "SDG10_Reduced_Inequalities": {
    elsevier_keywords: [
      "social inclusion",
      "economic inequality",
      "discrimination",
      "marginalized communities",
      "income distribution",
      "equal opportunity"
    ],
    auckland_keywords: [
      "refugees",
      "LGBTQ+ rights",
      "ethnic minorities",
      "intergenerational mobility"
    ]
  },
  "SDG11_Sustainable_Cities_and_Communities": {
    elsevier_keywords: [
      "urban development",
      "smart cities",
      "affordable housing",
      "public transport",
      "urban resilience",
      "sustainable urbanization"
    ],
    auckland_keywords: [
      "green buildings",
      "urban planning",
      "community engagement",
      "urban poverty"
    ]
  },
  "SDG12_Responsible_Consumption_and_Production": {
    elsevier_keywords: [
      "sustainable consumption",
      "waste management",
      "circular economy",
      "eco-efficiency",
      "resource efficiency",
      "consumer behavior"
    ],
    auckland_keywords: [
      "green supply chain",
      "product lifecycle",
      "industrial symbiosis",
      "waste reduction"
    ]
  },
  "SDG13_Climate_Action": {
    elsevier_keywords: [
      "climate change",
      "carbon emissions",
      "greenhouse gases",
      "GHG reduction",
      "climate policy",
      "resilience",
      "climate adaptation"
    ],
    auckland_keywords: [
      "extreme weather",
      "climate resilience",
      "climate mitigation",
      "carbon footprint"
    ]
  },
  "SDG14_Life_Below_Water": {
    elsevier_keywords: [
      "marine conservation",
      "ocean pollution",
      "overfishing",
      "marine biodiversity",
      "coral reefs",
      "sustainable fisheries"
    ],
    auckland_keywords: [
      "marine ecosystems",
      "plastic waste",
      "aquatic habitats",
      "marine protected areas"
    ]
  },
  "SDG15_Life_on_Land": {
    elsevier_keywords: [
      "deforestation",
      "reforestation",
      "biodiversity",
      "land degradation",
      "ecosystem restoration",
      "forest conservation"
    ],
    auckland_keywords: [
      "protected areas",
      "terrestrial ecosystems",
      "land use change",
      "wildlife habitat"
    ]
  },
  "SDG16_Peace_Justice_and_Strong_Institutions": {
    elsevier_keywords: [
      "rule of law",
      "access to justice",
      "corruption",
      "human rights",
      "violence prevention",
      "strong institutions"
    ],
    auckland_keywords: [
      "judicial reform",
      "civil liberties",
      "freedom of expression",
      "peacebuilding"
    ]
  },
  "SDG17_Partnerships_for_the_Goals": {
    elsevier_keywords: [
      "global partnerships",
      "international cooperation",
      "capacity building",
      "multilateralism",
      "foreign aid",
      "public-private partnerships"
    ],
    auckland_keywords: [
      "technology transfer",
      "cross-sector collaboration",
      "development finance",
      "policy coherence"
    ]
  }
};

// src/matchProject.ts
var SDG_MAP = {
  "SDG 1": "No Poverty",
  "SDG 2": "Zero Hunger",
  "SDG 3": "Good Health and Well-being",
  "SDG 4": "Quality Education",
  "SDG 5": "Gender Equality",
  "SDG 6": "Clean Water and Sanitation",
  "SDG 7": "Affordable and Clean Energy",
  "SDG 8": "Decent Work and Economic Growth",
  "SDG 9": "Industry, Innovation and Infrastructure",
  "SDG 10": "Reduced Inequalities",
  "SDG 11": "Sustainable Cities and Communities",
  "SDG 12": "Responsible Consumption and Production",
  "SDG 13": "Climate Action",
  "SDG 14": "Life Below Water",
  "SDG 15": "Life on Land",
  "SDG 16": "Peace, Justice and Strong Institutions",
  "SDG 17": "Partnerships for the Goals"
};
function filterProjectBySDGs(text, userInput) {
  if (!text) return 0;
  const loweredText = text.toLowerCase();
  const matched = /* @__PURE__ */ new Set();
  const descriptionToCode = Object.entries(SDG_MAP).reduce((acc, [code, desc]) => {
    acc[desc.toLowerCase()] = code;
    return acc;
  }, {});
  const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  for (const input of userInput) {
    const trimmedInput = input.trim();
    let code;
    if (/^sdg\s*\d{1,2}$/i.test(trimmedInput)) {
      code = trimmedInput.toUpperCase().replace(/\s+/g, " ");
    } else {
      code = descriptionToCode[trimmedInput.toLowerCase()];
    }
    if (!code) continue;
    const description = SDG_MAP[code];
    const sdgNumber = code.match(/\d+/)?.[0] || "";
    const keywordKey = `SDG${sdgNumber}_${description.replace(/[^\w]/g, "_")}`;
    const codeRegex = new RegExp(`\\b${escapeRegex(code.toLowerCase())}\\b`, "i");
    const descRegex = description ? new RegExp(`\\b${escapeRegex(description.toLowerCase())}\\b`, "i") : null;
    let matchedThisSDG = false;
    if (codeRegex.test(loweredText)) {
      matched.add(code);
      continue;
    }
    if (descRegex && descRegex.test(loweredText)) {
      matched.add(code);
      continue;
    }
    const sdgNumberListRegex = /sdg\s*((\d{1,2}[\s,]*(and\s*)?)*)/gi;
    let match;
    while ((match = sdgNumberListRegex.exec(loweredText)) !== null) {
      const nums = match[1].match(/\d{1,2}/g);
      if (nums && nums.includes(sdgNumber)) {
        matched.add(code);
        matchedThisSDG = true;
        break;
      }
    }
    if (!matchedThisSDG && SDG_KEYWORDS[keywordKey]) {
      const allKeywords = [
        ...SDG_KEYWORDS[keywordKey].elsevier_keywords,
        ...SDG_KEYWORDS[keywordKey].auckland_keywords
      ];
      for (const keyword of allKeywords) {
        const keywordRegex = new RegExp(`\\b${escapeRegex(keyword.toLowerCase())}\\b`, "i");
        if (keywordRegex.test(loweredText)) {
          matched.add(code);
          break;
        }
      }
    }
  }
  return matched.size;
}

// src/indexer.ts
var GlobalIndexer = class {
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
    const keywords = [schema, sdgs];
    const encodedKeywords = encodeURIComponent(JSON.stringify(keywords));
    const resp = await this.client.get(`/entities/vc-documents?keywords=${encodedKeywords}`);
    const items = resp?.data?.items || [];
    const SchemaBasedProjects = items;
    return SchemaBasedProjects;
  }
  async fetchBasedOnSchemaID(schemaIds) {
    const SchemaBasedProjects = [];
    for (const id of schemaIds) {
      const resp = await this.client.get(`/entities/vc-documents?analytics.schemaId=${encodeURIComponent(id)}`);
      const items = resp?.data?.items || [];
      SchemaBasedProjects.push(...items);
    }
    return SchemaBasedProjects;
  }
  async getDocumentsByKeywords(funding_target = [], timeframe = [], region = [], project_type = [], verification = [], sdgs = []) {
    const submitProjects = await this.fetchProjectsBasedOnSchema("SubmitProject", "sdg");
    const verifyProjects = await this.fetchProjectsBasedOnSchema("Verify Project", "sdg");
    const ProjectSubmissionForm = await this.fetchProjectsBasedOnSchema("Project Submission Form", "sdg");
    const GHGProjects = await this.fetchBasedOnSchemaID(["1733734487.531116964", "1733906381.658350000"]);
    const Projects = [...submitProjects, ...verifyProjects, ...GHGProjects, ...ProjectSubmissionForm];
    const keywords = [
      ...region,
      ...project_type,
      ...verification,
      ...sdgs
    ].filter(Boolean);
    if (!Array.isArray(keywords) || keywords.length === 0) {
      throw new Error("At least one filter (funding_target, timeframe, region, project_type, verification, sdgs) must be non-empty.");
    }
    const useKeywordSearch = keywords.length > 0 && sdgs.length > 0 && keywords.length > sdgs.length;
    if (useKeywordSearch) {
      const resp = await this.client.get(`/entities/vc-documents?keywords=${encodeURIComponent(JSON.stringify(keywords))}`);
      const items = resp?.data?.items || [];
      const ProjectsBasedOnKeywords = items;
      console.log(ProjectsBasedOnKeywords.length);
      return ProjectsBasedOnKeywords;
    } else {
      const filteredWithCount = [];
      for (const item of Projects) {
        const textSearch = item?.analytics?.textSearch || "";
        const matchCount = filterProjectBySDGs(textSearch, sdgs);
        if (matchCount > 0) {
          filteredWithCount.push({ item, count: matchCount });
        }
      }
      filteredWithCount.sort((a, b) => b.count - a.count);
      const filteredItems = filteredWithCount.map((entry) => entry.item);
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
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GlobalIndexer,
  createClient
});
