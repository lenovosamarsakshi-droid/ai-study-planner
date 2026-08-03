export function buildRoadmapPrompt(data) {
  return `
You are an expert AI Study Planner.

Create an optimized study roadmap.

Student Details:

Subject:
${data.subject}

Topics:
${data.topics}

Deadline:
${data.deadline}

Study Hours Per Day:
${data.hours}

Available Study Days:
${data.availableDays}

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

- Every topic must appear at least once.
Do not repeat topics unless creating a revision day.
- Create EXACTLY ${data.availableDays} study days.
- Do NOT create more or fewer days.
- Distribute topics logically.
Some topics may require more time than others.
- Include revision only if there is enough time.
- Keep each day's study time within ${data.hours} hours.
-Return ONLY a single valid JSON object.

Do not write any explanation before or after the JSON.

Do not use markdown.

The first character of your response must be {

The last character of your response must be }
`;
}   