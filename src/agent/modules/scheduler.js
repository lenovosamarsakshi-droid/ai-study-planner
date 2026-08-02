export function buildSchedule(studentData, analysis) {

  const todayPlan = [];

  // Add urgent tasks first
  analysis.urgentTasks.forEach(task => {
    todayPlan.push({
      type: "Task",
      title: task.task,
      priority: "High",
    });
  });

  // Then exams
  analysis.urgentExams.forEach(exam => {
    todayPlan.push({
      type: "Exam",
      title: exam.subject,
      priority: "Medium",
    });
  });

  return todayPlan;
}