import {
  loadStudentProfile,
  saveStudentProfile,
} from "./profile";

export function updateStudentProfile(tasks) {
  const profile = loadStudentProfile();

  profile.totalTasks = tasks.length;

  profile.completedTasks = tasks.filter(
    task => task.completed
  ).length;

  const subjectStats = {};

  tasks.forEach(task => {
    if (!subjectStats[task.subject]) {
      subjectStats[task.subject] = {
        total: 0,
        completed: 0,
      };
    }

    subjectStats[task.subject].total++;

    if (task.completed) {
      subjectStats[task.subject].completed++;
    }
  });

  profile.strongSubjects = [];
  profile.weakSubjects = [];

  Object.entries(subjectStats).forEach(
    ([subject, stats]) => {

      const completionRate =
        stats.completed / stats.total;

      if (completionRate >= 0.8) {
        profile.strongSubjects.push(subject);
      }

      if (completionRate <= 0.4) {
        profile.weakSubjects.push(subject);
      }
    }
  );

  saveStudentProfile(profile);

  return profile;
}