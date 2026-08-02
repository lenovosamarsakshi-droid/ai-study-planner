import { analyzeStudent } from "./modules/analyzer";
import { buildSchedule } from "./modules/scheduler";
import { shouldUseAI } from "./modules/decision";
import { createStudyPlan } from "./modules/planner";

export async function runAgent(tasks, exams) {

  // 👀 Observe
  const studentData = {
    today: new Date(),
    tasks,
    exams,
  };

  // 🧠 Analyze
  const analysis = analyzeStudent(studentData);

  // 📅 Build Schedule
  const schedule = buildSchedule(studentData, analysis);

  // 🤔 Decide
  const useAI = shouldUseAI(studentData, analysis);

  // 📝 Final Plan
  if (useAI) {
    return await createStudyPlan(
      studentData,
      analysis,
      schedule
    );
  }

  return {
    usedAI: false,
    schedule,
    message: "Simple schedule generated locally.",
  };
}