export const samplePlugins = [
  {
    id: "plugin-browser",
    name: "Browser Control",
    weeklyUses: 18,
    monthlyUses: 64,
    estimatedCost: "low",
    lastUsedDaysAgo: 1,
    userRating: 5,
    description: "Controls the in-app browser for local app checks, screenshots, and UI verification.",
    url: "https://example.com/coqid-game/plugins/browser-control"
  },
  {
    id: "plugin-presentations",
    name: "Presentation Builder",
    weeklyUses: 0,
    monthlyUses: 22,
    estimatedCost: "medium",
    lastUsedDaysAgo: 46,
    userRating: 4,
    description: "Creates slide decks and demo-ready presentation assets from structured prompts.",
    url: "https://example.com/coqid-game/plugins/presentation-builder"
  },
  {
    id: "plugin-old-expensive",
    name: "Legacy Cloud Sync",
    weeklyUses: 0,
    monthlyUses: 1,
    estimatedCost: "high",
    lastUsedDaysAgo: 180,
    userRating: 1,
    description: "A costly sync helper kept as a sample deletion-review candidate in the local demo.",
    url: "https://example.com/coqid-game/plugins/legacy-cloud-sync"
  },
  {
    id: "plugin-docs",
    name: "Document Studio",
    weeklyUses: 8,
    monthlyUses: 34,
    estimatedCost: "medium",
    lastUsedDaysAgo: 4,
    userRating: 4,
    description: "Builds and verifies document artifacts for reports, runbooks, and delivery notes.",
    url: "https://example.com/coqid-game/plugins/document-studio"
  },
  {
    id: "plugin-ideas",
    name: "Idea Spark",
    weeklyUses: 1,
    monthlyUses: 15,
    estimatedCost: "low",
    lastUsedDaysAgo: 60,
    userRating: 3,
    description: "Generates lightweight product ideas and brainstorming prompts for early planning.",
    url: "https://example.com/coqid-game/plugins/idea-spark"
  }
];

export const malformedPlugins = [
  {
    id: "broken-cost",
    name: "Broken Cost Plugin",
    weeklyUses: 2,
    monthlyUses: 3,
    estimatedCost: "unknown",
    lastUsedDaysAgo: 10
  },
  {
    id: "",
    name: "Missing Identifier",
    weeklyUses: -1,
    monthlyUses: 2,
    estimatedCost: "low",
    lastUsedDaysAgo: 5
  }
];
