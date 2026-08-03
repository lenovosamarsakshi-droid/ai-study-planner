export function createRoadmapObject(
  subject,
  deadline,
  roadmap
) {
 return {
  id: crypto.randomUUID(),

  subject,

  deadline,

  createdAt: new Date().toISOString(),

  status: "active",

  roadmap,
};
}