import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function getStudyAdvice(prompt) {
  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
  });

 const content = response.choices[0].message.content
  .replace(/```json\s*/gi, "")
  .replace(/```\s*/g, "")
  .trim();

return content;
}