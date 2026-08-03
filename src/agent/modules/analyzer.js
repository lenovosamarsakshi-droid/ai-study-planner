export function buildContext(studentData) {
  return {
    currentDate: new Date().toISOString(),

    student: {
      tasks: studentData.tasks,
      exams: studentData.exams,
      profile: studentData.profile,
    },
     profile: studentData.profile,

    statistics: {
      totalTasks: studentData.tasks.length,
      totalExams: studentData.exams.length,
    },
  };
}