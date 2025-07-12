import axios from "axios";

export function createClient(baseURL: string, apiKey?: string) {
  const instance = axios.create({
    baseURL,
    headers: apiKey ? { Authorization: `Bearer ${apiKey}` } : undefined
  });

  return instance;
}

