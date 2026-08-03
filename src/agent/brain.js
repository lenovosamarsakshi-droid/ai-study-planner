import { buildContext } from "./modules/analyzer";
import { createStudyPlan } from "./modules/planner";

export async function runAgent(tasks, exams) {

  // Step 1: Observe
  const studentData = {
    tasks,
    exams,
  };

  // Step 2: Build Context
  const context = buildContext(studentData);

  // Step 3: Ask the AI to reason
  const studyPlan = await createStudyPlan(context);

  return studyPlan;
}