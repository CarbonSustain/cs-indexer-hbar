const fetch = require('node-fetch'); // Install: npm install node-fetch@2

// Simulated indexer response
const indexerData = {
  message: "eyJpZCI6IjE3NzEyMDBjLTE4OTItNDI4Zi1hNmNkLTIyNmJjNDRlYWE0MCIsInN0YXR1cyI6IklTU1VFIiwidHlwZSI6IlZDLURvY3VtZW50IiwiYWN0aW9uIjoiY3JlYXRlLXZjLWRvY3VtZW50IiwibGFuZyI6ImVuLVVTIiwiaXNzdWVyIjoiZGlkOmhlZGVyYTp0ZXN0bmV0OjIzY1JZVjk5NW5Oc29rZW0yU2doVlF0VjU2MnRGVU1xQnFFRXhDbVg3UEY3XzAuMC41MTI1ODY2IiwicmVsYXRpb25zaGlwcyI6WyIxNzMxNjgxODk4LjA2Mzg5MTg2NyJdLCJlbmNvZGVkRGF0YSI6ZmFsc2UsImRvY3VtZW50U3RhdHVzIjoiTkVXIiwiY2lkIjoiYmFma3JlaWd2ZDNzeG5hNGU0YTR2cjNmdG5lb2lyNGdwM3Nnb2t0bWgzcXFyeW5ybmhqeXlkNHRhNXkiLCJ1cmkiOiJpcGZzOi8vYmFma3JlaWd2ZDNzeG5hNGU0YTR2cjNmdG5lb2lyNGdwM3Nnb2t0bWgzcXFyeW5ybmhqeXlkNHRhNXkifQ==",
  data: "{\"id\":\"1771200c-1892-428f-a6cd-226bc44eaa40\",\"status\":\"ISSUE\",\"type\":\"VC-Document\",\"action\":\"create-vc-document\",\"lang\":\"en-US\",\"issuer\":\"did:hedera:testnet:23cRYV995nNsokem2SghVQtV562tFUMqBqEExCmX7PF7_0.0.5125866\",\"relationships\":[\"1731681898.063891867\"],\"encodedData\":false,\"documentStatus\":\"NEW\",\"cid\":\"bafkreigvd3sxna4e4a4vr3ftneoir4gp3sgoktmh3qqrynrnhjyyd4ta5y\",\"uri\":\"ipfs://bafkreigvd3sxna4e4a4vr3ftneoir4gp3sgoktmh3qqrynrnhjyyd4ta5y\"}"
};

// Decode base64 message (optional)
function decodeMessage(base64Str) {
  try {
    return JSON.parse(Buffer.from(base64Str, 'base64').toString('utf-8'));
  } catch (err) {
    console.error('Failed to decode base64 message:', err.message);
    return null;
  }
}

// Fetch IPFS document by CID
async function fetchIPFSData(cid) {
  const url = `https://ipfs.io/ipfs/${cid}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const json = await response.json();
    return json;
  } catch (err) {
    console.error(`Failed to fetch from IPFS [${cid}]:`, err.message);
    return null;
  }
}

// Extract SDG-related fields
function extractSDGFields(vcData) {
  if (!vcData) return null;

  const subject = vcData.credentialSubject || vcData.subject || {};
  const sdg = subject.sdg || subject.sdgGoals || null;

  if (!sdg) {
    console.warn('No SDG data found in credentialSubject.');
    return null;
  }

  return {
    sdgGoal: sdg.goal || null,
    description: sdg.description || null,
    indicators: sdg.indicators || [],
    rawSDG: sdg
  };
}

// Main function
async function main() {
  const data = JSON.parse(indexerData.data); // Or use decodeMessage(indexerData.message);
  const cid = process.argv[2] || JSON.parse(indexerData.data).cid;
  console.log('CID:', cid);

  const vcFromIPFS = await fetchIPFSData(cid);


  console.log('\n--- Full VC from IPFS ---');
  console.dir(vcFromIPFS, { depth: null });

  const sdgInfo = extractSDGFields(vcFromIPFS);
  if (sdgInfo) {
    console.log('\n--- Extracted SDG Info ---');
    console.log(sdgInfo);
  } else {
    console.log('\nNo SDG fields found.');
  }
}

main();
