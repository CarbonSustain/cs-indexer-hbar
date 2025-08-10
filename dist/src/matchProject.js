import { SDG_KEYWORDS } from './sdg_keywords.js';
export const SDG_MAP = {
    'SDG 1': 'No Poverty',
    'SDG 2': 'Zero Hunger',
    'SDG 3': 'Good Health and Well-being',
    'SDG 4': 'Quality Education',
    'SDG 5': 'Gender Equality',
    'SDG 6': 'Clean Water and Sanitation',
    'SDG 7': 'Affordable and Clean Energy',
    'SDG 8': 'Decent Work and Economic Growth',
    'SDG 9': 'Industry, Innovation and Infrastructure',
    'SDG 10': 'Reduced Inequalities',
    'SDG 11': 'Sustainable Cities and Communities',
    'SDG 12': 'Responsible Consumption and Production',
    'SDG 13': 'Climate Action',
    'SDG 14': 'Life Below Water',
    'SDG 15': 'Life on Land',
    'SDG 16': 'Peace, Justice and Strong Institutions',
    'SDG 17': 'Partnerships for the Goals',
};
// export function filterProjectBySDGs(text: string, userInput: string[]): number {
//   if (!text) return 0;
//   const normalizedSdgs = userInput.map(sdg => {
//     const key = sdg.trim().toUpperCase();
//     return SDG_MAP[key] || sdg;
//   }).map(val => val.toLowerCase());
//   const loweredText = text.toLowerCase();
//   let matchCount = 0;
//   for (const sdg of normalizedSdgs) {
//       if (loweredText.includes(sdg)) {
//         matchCount++;
//       }
//     }
//   return matchCount;
// }
// export function filterProjectBySDGs(text: string, userInput: string[]): number {
//   if (!text) return 0;
//   const loweredText = text.toLowerCase();
//   const matched = new Set<string>();
//   // Reverse map: description (lowercase) => SDG code
//   const descriptionToCode = Object.entries(SDG_MAP).reduce((acc, [code, desc]) => {
//     acc[desc.toLowerCase()] = code;
//     return acc;
//   }, {} as Record<string, string>);
//   // Helper to escape regex special characters
//   const escapeRegex = (str: string) =>
//     str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
//   for (const input of userInput) {
//     const trimmedInput = input.trim();
//     // Determine the SDG code
//     let code: string | undefined;
//     if (/^sdg\s*\d{1,2}$/i.test(trimmedInput)) {
//       code = trimmedInput.toUpperCase().replace(/\s+/g, ' ');
//     } else {
//       code = descriptionToCode[trimmedInput.toLowerCase()];
//     }
//     if (!code) {
//       // Unknown SDG, just skip
//       continue;
//     }
//     const description = SDG_MAP[code];
//     // Regex to match full SDG code with word boundaries, e.g., "sdg 1", "sdg 10"
//     const codeRegex = new RegExp(`\\b${escapeRegex(code.toLowerCase())}\\b`, 'i');
//     // Regex to match full description exactly
//     const descRegex = description
//       ? new RegExp(`\\b${escapeRegex(description.toLowerCase())}\\b`, 'i')
//       : null;
//     // Check if either code or description matches
//     if (codeRegex.test(loweredText) || (descRegex && descRegex.test(loweredText))) {
//       matched.add(code);
//       continue;
//     }
//     // Additionally, handle cases where multiple SDGs are listed in text in comma separated or bracketed form,
//     // e.g. "SDG 7, 8, 9 and 13"
//     // Extract all SDG numbers in text (e.g. from "SDG 7, 8, 9")
//     const sdgNumberListRegex = /sdg\s*((\d{1,2}[\s,]*(and\s*)?)*)/gi;
//     let match;
//     while ((match = sdgNumberListRegex.exec(loweredText)) !== null) {
//       const numbersPart = match[1]; // e.g. "7, 8, 9 and 13"
//       // Extract all numbers
//       const nums = numbersPart.match(/\d{1,2}/g);
//       if (nums && nums.includes(code.match(/\d+/)![0])) {
//         matched.add(code);
//         break;
//       }
//     }
//   }
//   return matched.size;
// }
export function filterProjectBySDGs(text, userInput) {
    var _a;
    if (!text)
        return 0;
    const loweredText = text.toLowerCase();
    const matched = new Set();
    // Reverse map: description (lowercase) => SDG code
    const descriptionToCode = Object.entries(SDG_MAP).reduce((acc, [code, desc]) => {
        acc[desc.toLowerCase()] = code;
        return acc;
    }, {});
    // Escape regex
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    for (const input of userInput) {
        const trimmedInput = input.trim();
        // Determine SDG code from input
        let code;
        if (/^sdg\s*\d{1,2}$/i.test(trimmedInput)) {
            code = trimmedInput.toUpperCase().replace(/\s+/g, ' ');
        }
        else {
            code = descriptionToCode[trimmedInput.toLowerCase()];
        }
        if (!code)
            continue;
        const description = SDG_MAP[code];
        const sdgNumber = ((_a = code.match(/\d+/)) === null || _a === void 0 ? void 0 : _a[0]) || '';
        const keywordKey = `SDG${sdgNumber}_${description.replace(/[^\w]/g, '_')}`;
        const codeRegex = new RegExp(`\\b${escapeRegex(code.toLowerCase())}\\b`, 'i');
        const descRegex = description
            ? new RegExp(`\\b${escapeRegex(description.toLowerCase())}\\b`, 'i')
            : null;
        let matchedThisSDG = false;
        // 1. Check SDG code match
        if (codeRegex.test(loweredText)) {
            matched.add(code);
            continue;
        }
        // 2. Check SDG description match
        if (descRegex && descRegex.test(loweredText)) {
            matched.add(code);
            continue;
        }
        // 3. Check comma-separated SDG numbers like "SDG 1, 2, and 3"
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
        // 4. Check associated keywords
        if (!matchedThisSDG && SDG_KEYWORDS[keywordKey]) {
            const allKeywords = [
                ...SDG_KEYWORDS[keywordKey].elsevier_keywords,
                ...SDG_KEYWORDS[keywordKey].auckland_keywords
            ];
            for (const keyword of allKeywords) {
                const keywordRegex = new RegExp(`\\b${escapeRegex(keyword.toLowerCase())}\\b`, 'i');
                if (keywordRegex.test(loweredText)) {
                    matched.add(code);
                    break;
                }
            }
        }
    }
    return matched.size;
}
