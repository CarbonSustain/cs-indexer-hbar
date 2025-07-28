import requests
import base64
import json
from datetime import datetime
from urllib.parse import urljoin

# 🌐 CONFIG
MIRROR_NODE_URL = "https://testnet.mirrornode.hedera.com/api/v1/topics/"
TOPIC_ID = "0.0.5283967"  # Replace with your topic ID
# GUARDIAN_API = "https://guardian-testnet.hashgraph.com/api/v1/vc/document/"
GUARDIAN_API = "https://guardianservice.app/api/v1/vc/document/"
# https://guardianservice.app/api/v1/vc/document/
# https://guardianservice.app/


def fetch_vc_details(vc_id):
    url = urljoin(GUARDIAN_API, vc_id)
    resp = requests.get(url)
    print(resp)
    if resp.status_code == 200:
        return resp.json()
    return None


def fetch_all_messages(topic_id):
    url = urljoin(MIRROR_NODE_URL, f"{topic_id}/messages")
    messages = []

    while url:
        resp = requests.get(url)
        resp.raise_for_status()
        data = resp.json()
        messages.extend(data.get("messages", []))
        # Get next page if exists
        next_link = data.get("links", {}).get("next")
        url = urljoin(MIRROR_NODE_URL, next_link) if next_link else None
    return messages


def decode_message(message):
    decoded_json = base64.b64decode(message).decode("utf-8")
    try:
        return json.loads(decoded_json)
    except json.JSONDecodeError:
        return decoded_json  # if it's not JSON, return as raw text


def process_messages(messages):
    processed = []
    for msg in messages:
        payload = decode_message(msg["message"])
        consensus_time = datetime.utcfromtimestamp(
            float(msg["consensus_timestamp"]))

        record = {
            "consensus_timestamp": consensus_time.isoformat(),
            "sequence_number": msg["sequence_number"],
            "type": payload.get("type"),
            "action": payload.get("action"),
            "status": payload.get("status"),
            "documentStatus": payload.get("documentStatus"),
            "issuer": payload.get("issuer"),
            "id": payload.get("id"),
            "cid": payload.get("cid"),
            "uri": payload.get("uri"),
            "relationships": payload.get("relationships"),
        }
        processed.append(record)
    return processed


def main():
    print("Fetching messages from topic:", TOPIC_ID)
    messages = fetch_all_messages(TOPIC_ID)
    print(f"Total messages fetched: {len(messages)}\n")

    processed = process_messages(messages)

    for p in processed:
        print(json.dumps(p, indent=2))

    print("Next FLOW")
    for p in processed:
        if p["id"]:
            details = fetch_vc_details(p["id"])
            if details:
                print(f"\n🔍 Extra details for VC {p['id']}:")
                print(json.dumps(details, indent=2))

    # Optional: Save to a file
    with open("guardian_parsed_messages.json", "w") as f:
        json.dump(processed, f, indent=2)
    print("\n✅ Data saved to guardian_parsed_messages.json")


if __name__ == "__main__":
    main()
