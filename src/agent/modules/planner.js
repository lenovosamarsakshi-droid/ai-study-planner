import { getStudyAdvice } from "../../services/groq";

export async function createStudyPlan(studentData, analysis) {

  const aiPlan = await getStudyAdvice(
    studentData,
    analysis
  );

  return aiPlan;
}