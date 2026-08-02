import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function getStudyAdvice(tasks, exams) {
 const prompt = `
You are an experienced academic mentor.

Tasks:
${JSON.stringify(tasks)}

Exams:
${JSON.stringify(exams)}

Based on the student's tasks and exams:

- Identify the most urgent work.
- Warn if multiple deadlines are close together.
- Suggest a realistic study plan for today.
- Mention which subjects need revision first.
- Give one short motivational sentence.

Reply exactly like this:

Summary:
<summary>

Priority:
<priority>

Today's Plan:
• Item 1
• Item 2
• Item 3

Motivation:
<motivation>

Keep it under 120 words.
Do not use markdown symbols (#, ##, **).
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.choices[0].message.content;
}

export { getStudyAdvice };