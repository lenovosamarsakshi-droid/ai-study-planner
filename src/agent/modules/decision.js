export function shouldUseAI(studentData, analysis) {

  // Very simple rule for now

  const totalWork =
    analysis.totalTasks + analysis.totalExams;

  if (totalWork <= 2) {
    return false;
  }

  return true;
}   