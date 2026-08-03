import Groq from "groq-sdk";
import { buildRoadmapPrompt } from "../prompts/roadmapPrompt";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function createRoadmap(data) {
  const prompt = buildRoadmapPrompt(data);

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const content = response.choices[0].message.content
    .replace(/```json\s*/gi, "")
    .replace(/```\s*/g, "")
    .trim();
console.log("RAW ROADMAP RESPONSE:");
console.log(content);

 const jsonMatch = content.match(/\{[\s\S]*\}/);

if (!jsonMatch) {
  throw new Error("No valid JSON returned");
}

return JSON.parse(jsonMatch[0]);
}