export function buildContext(studentData) {
  return {
    currentDate: new Date().toISOString(),

    profile: studentData.profile,

    tasks: studentData.tasks.map(task => ({
      subject: task.subject,
      task: task.task,
      dueDate: task.dueDate,
      priority: task.priority,
      completed: task.completed,
    })),

    exams: studentData.exams.map(exam => ({
      subject: exam.subject,
      date: exam.date,
    })),

    statistics: {
      totalTasks: studentData.tasks.length,
      totalExams: studentData.exams.length,
    },
  };
}