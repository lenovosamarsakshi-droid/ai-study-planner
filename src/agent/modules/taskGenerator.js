export function generateTasksFromRoadmap(roadmapObject) {
  const tasks = [];

  roadmapObject.roadmap.forEach((dayPlan) => {
    const today = new Date();

const studyDate = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate()
);

studyDate.setHours(0, 0, 0, 0);

studyDate.setDate(
  studyDate.getDate() + (dayPlan.day - 1)
);
    dayPlan.tasks.forEach((task) => {
      tasks.push({
        id: crypto.randomUUID(),

        roadmapId: roadmapObject.id,

        subject: roadmapObject.subject,

        task: task,

       dueDate: `${studyDate.getFullYear()}-${String(
  studyDate.getMonth() + 1
).padStart(2, "0")}-${String(studyDate.getDate()).padStart(2, "0")}`,
        priority: "Medium",

        completed: false,

        estimatedMinutes: dayPlan.estimatedMinutes,

        day: dayPlan.day,
      });
    });
  });

  return tasks;
}