🌤️ clearsky‑HBAR The clearsky‑HBAR library provides a robust interface with Hedera Guardian Services — ingesting and indexing ReFi project data, methodologies, and documents, now including Verra’s latest digital integration.

🚀 Overview Indexing: Fetches ReFi project metadata and lifecycle events from Hedera Guardian.

Verra Integration: Supports Verra’s Verified Carbon Standard (VCS), REDD+, CCBS, SD VISta, and Scope 3 methodologies — enabled by the Hedera–Verra collaboration announced on May 28, 2025. reddit.com +4 verra.org +4 youtube.com +4

Methodology Library: Auto-discovers and parses digital methodology sets (including Verra's VM0033) from Guardian’s repository.

Flexible Storage: Decoupled architecture for persisting fetched data via SQL, NoSQL, or direct API.

🔗 Features 🔄 Full Data Sync: Projects, methodologies, dMRV records, MRV documents, issuance & retirement events.

⚙️ Index & Transform: Includes indexing utilities and normalization logic.

📚 Onboarding Verra Standards: Automatically consumes newly added digital Verra methodologies. carboncredits.com +4 verra.org +4 dltearth.com +4

🛠️ Plugin System: Customize connectors to PostgreSQL, Elasticsearch, AWS S3, etc.

🧪 CLI + APIs: Supports batch and incremental ingestion, plus REST endpoints.

📦 Installation bash Copy Edit npm install clearsky-hbar ⚙️ Quick Start js Copy Edit const { GuardianIndexer } = require('clearsky-hbar');

async function main() { const indexer = new GuardianIndexer({ hederaNode: process.env.HEDERA_NODE_URL, apiKey: process.env.HEDERA_API_KEY, output: dbClient, // e.g. PostgreSQL client plugins: [ pgPlugin(), esPlugin(), s3Plugin() ], watch: true });

await indexer.init(); await indexer.syncAll(); // full backfill indexer.watch(); // real-time updates

console.log('clearsky‑HBAR: sync started'); }

main().catch(console.error); 🧱 Architectural Overview scss Copy Edit Hedera Guardian ↔ clearsky‑HBAR ↔ Storage (Postgres, ES, S3) ↔ ClearSky Backend ↳ Verra methodology ingest (VCS, CCBS, REDD+, Scope‑3…) GuardianIndexer: Core engine to sync project data and MRV events.

VerraMethodologyLoader: Submodule that fetches digital Verra standards on supply.

Plugin System: For plugging in storage/output systems.

🛠️ Configuration Option Description hederaNode URL to Hedera Guardian node or indexer API apiKey Optional API key for Guardian access output Storage client to persist data plugins Array of plugin instances for transformation or output watch Enable real-time listening via webhooks or Hedera Consensus streams

🔭 Verra Methodology Support Thanks to the recent Hedera–Verra announcement, clearsky‑HBAR now supports:

Ingestion of VCS digital methodologies (e.g. VM0033)

Parsing of project registration docs

Automated updates to project lifecycle and issuance tracking reddit.com +7 verra.org +7 hedera.com +7 reddit.com

This enables highly accurate and transparent sourcing from Verra’s Project Hub.

📘 Documentation API reference: [docs/API.md]

Plugin guides

CLI usage tips

🧪 Tests & CI bash Copy Edit npm run test npm run lint CI ensures quality and compliance with future updates in Guardian or Verra standards.

🚧 Roadmap ✅ Core Guardian indexing engine

✅ Verra methodology loader

⚙️ Support for UNDP’s National Carbon Registry (via DPG) linkedin.com +2 carboncredits.com +2 verra.org +2 reddit.com +1 dltearth.com +1 verra.org +2 hedera.foundation +2 carboncredits.com +2

🔄 Support for other standards (Gold Standard, etc.)

📦 Docker & AWS Lambda deployment support

🛡️ Signature verification of methodology payloads

🤝 Contributing We welcome improvements! Please open PRs for:

New plugin system integrations

Verra or other methodology parsers

Bug fixes and indexer reliability enhancements

📬 Contact & Adoption Questions or support? Reach out to team@clearsky.io

Looking to integrate? Get in touch—we’re onboarding enterprise users daily.
