/**
 * "Trusted by" strip entries. `logo` (a lib/media.ts key) renders a real
 * mark; entries without one fall back to a text wordmark until a logo
 * asset is available.
 */
export type Client = {
  name: string;
  logo?: string;
};

export const clients: Client[] = [
  { name: "GN Media" },
  { name: "MAZAL" },
  { name: "Chainlink" },
  { name: "Founders Summit" },
  { name: "Studio One" },
];
