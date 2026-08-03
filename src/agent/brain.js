import { buildContext } from "./modules/analyzer";
import { createStudyPlan } from "./modules/planner";
import { loadStudentProfile } from "./memory/profile";

export async function runAgent(tasks, exams) {

  const studentData = {
    tasks,
    exams,
    profile: loadStudentProfile(),
  };

  const context = buildContext(studentData);

  const studyPlan = await createStudyPlan(context);

  return studyPlan;
}