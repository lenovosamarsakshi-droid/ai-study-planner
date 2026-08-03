import { buildPlannerPrompt } from "../prompts/plannerPrompt";
import { getStudyAdvice } from "../../services/groq";

export async function createStudyPlan(context) {

  const prompt = buildPlannerPrompt(context);

  return await getStudyAdvice(prompt);

}