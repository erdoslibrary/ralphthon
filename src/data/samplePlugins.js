export const samplePlugins = [
  {
    id: "plugin-browser",
    name: "Browser Control",
    weeklyUses: 18,
    monthlyUses: 64,
    estimatedCost: "low",
    lastUsedDaysAgo: 1,
    userRating: 5
  },
  {
    id: "plugin-presentations",
    name: "Presentation Builder",
    weeklyUses: 0,
    monthlyUses: 22,
    estimatedCost: "medium",
    lastUsedDaysAgo: 46,
    userRating: 4
  },
  {
    id: "plugin-old-expensive",
    name: "Legacy Cloud Sync",
    weeklyUses: 0,
    monthlyUses: 1,
    estimatedCost: "high",
    lastUsedDaysAgo: 180,
    userRating: 1
  },
  {
    id: "plugin-docs",
    name: "Document Studio",
    weeklyUses: 8,
    monthlyUses: 34,
    estimatedCost: "medium",
    lastUsedDaysAgo: 4,
    userRating: 4
  },
  {
    id: "plugin-ideas",
    name: "Idea Spark",
    weeklyUses: 1,
    monthlyUses: 15,
    estimatedCost: "low",
    lastUsedDaysAgo: 60,
    userRating: 3
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
