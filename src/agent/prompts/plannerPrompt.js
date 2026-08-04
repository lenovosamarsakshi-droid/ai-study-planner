export function buildPlannerPrompt(context) {
  return `
You are an AI study planner.

Analyze the student's context and return ONLY valid JSON.

Student:

${JSON.stringify(context)}

Rules:
- Prioritize weak subjects if they have upcoming tasks or exams.
- Maintain strong subjects with regular revision.
- Respect preferredStudyHours and preferredSession.
- Encourage maintaining study streaks.
- If many tasks are skipped, recommend catching up.
- Study sessions must be 30-180 minutes.
- Total study time should roughly equal estimatedStudyHours * 60.

Return exactly this JSON:

{
  "analysis": {
    "workload": "",
    "estimatedStudyHours": 0,
    "riskLevel": ""
  },
  "priority": {
    "subject": "",
    "reason": ""
  },
  "todayPlan": [
    {
      "subject": "",
      "task": "",
      "duration": 0
    }
  ],
  "warnings": [],
  "coach": {
    "motivation": ""
  }
}

Return JSON only.
`;
}