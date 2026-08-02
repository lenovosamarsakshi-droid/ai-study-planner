export function analyzeStudent(studentData) {
  const today = new Date();

  // Keep only upcoming tasks
  const upcomingTasks = studentData.tasks.filter(task => {
    return new Date(task.dueDate) >= today;
  });

  // Keep only upcoming exams
  const upcomingExams = studentData.exams.filter(exam => {
    return new Date(exam.date) >= today;
  });

  // Sort by nearest date
  upcomingTasks.sort(
    (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
  );

  upcomingExams.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return {
    totalTasks: upcomingTasks.length,
    totalExams: upcomingExams.length,

    urgentTasks: upcomingTasks.slice(0, 3),
    urgentExams: upcomingExams.slice(0, 3),

    hasTasks: upcomingTasks.length > 0,
    hasExams: upcomingExams.length > 0,
  };
}