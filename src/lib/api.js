import { APP_CONFIG } from "../config";
import { demoApiFetch } from "./demoData";

export async function apiFetch(path, options = {}) {
  // ── Offline demo mode: route through mock handlers ──
  if (APP_CONFIG.DEMO_MODE) {
    return demoApiFetch(path, options);
  }

  // ── Normal mode: real API calls ──
  const { token, body, headers, ...rest } = options;

  const response = await fetch(path, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(payload?.message ?? "Request failed.");
  }

  return payload;
}
