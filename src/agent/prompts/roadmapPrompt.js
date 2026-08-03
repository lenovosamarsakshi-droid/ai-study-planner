export function buildRoadmapPrompt(data) {
  return `
You are an expert AI Study Planner.

Create a complete study roadmap.

Student Details:

Subject:
${data.subject}

Topics:
${data.topics}

Deadline:
${data.deadline}

Study Hours Per Day:
${data.hours}

Return ONLY valid JSON.

{
  "roadmap": [
    {
      "day": 1,
      "title": "",
      "tasks": [
        ""
      ],
      "estimatedMinutes": 120
    }
  ]
}

Rules:

- Divide topics evenly until the deadline.
- Include revision days.
- Keep daily study time within the student's available hours.
- Return JSON only.
`;
}