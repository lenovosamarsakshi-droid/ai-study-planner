export function loadStudentProfile() {
  const saved = localStorage.getItem("studentProfile");

  if (saved) {
    return JSON.parse(saved);
  }

  return {
    name: "",
    
    preferredStudyHours: 2,

    strongSubjects: [],

    weakSubjects: [],

    completedTasks: 0,

    totalTasks: 0,

    studyStreak: 0,

    lastRoadmap: null,
  };
}
export function saveStudentProfile(profile) {
  localStorage.setItem(
    "studentProfile",
    JSON.stringify(profile)
  );
}