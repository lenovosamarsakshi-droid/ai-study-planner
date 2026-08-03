import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function extractMemory(message) {
  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",

    messages: [
      {
        role: "system",
        content: `
You extract useful long-term learning memories.

Return ONLY one short sentence.

Examples:

Input:
"I struggle with SQL joins."

Output:
Student struggles with SQL joins.

Input:
"I have a DBMS exam tomorrow."

Output:
Student is preparing for a DBMS exam.

Input:
"Hello"

Output:
None

If nothing should be remembered, return only:
None
`,
      },
      {
        role: "user",
        content: message,
      },
    ],
  });

  return response.choices[0].message.content.trim();
}