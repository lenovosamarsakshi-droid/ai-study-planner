import { useState } from "react";
import { createRoadmap } from "../agent/modules/roadmap";
import { createRoadmapObject } from "../agent/memory/roadmaps";
import { generateTasksFromRoadmap } from "../agent/modules/taskGenerator";

export default function GeneratePlan({
  tasks,
  setTasks,
}) {
  const [subject, setSubject] = useState("");
  const [topics, setTopics] = useState("");
  const [deadline, setDeadline] = useState("");
  const [hours, setHours] = useState("");
  const [roadmap, setRoadmap] = useState(null);

  async function handleGenerate() {
  try {
    const today = new Date();
const deadlineDate = new Date(deadline + "T23:59:59");

const difference = deadlineDate - today;

const availableDays = Math.max(
  1,
  Math.ceil(difference / (1000 * 60 * 60 * 24))
);
    const result = await createRoadmap({
  subject,
  topics,
  deadline,
  hours,
  availableDays,
});

    console.log(result);

    setRoadmap(result);
  } catch (error) {
    console.error(error);
    alert("Failed to generate roadmap.");
  }
}
function handleSaveRoadmap() {
  if (!roadmap) return;

  const roadmapObject = createRoadmapObject(
    subject,
    deadline,
    roadmap.roadmap
);

const generatedTasks =
    generateTasksFromRoadmap(roadmapObject);
    console.log("GENERATED TASKS:");
    console.table(
  generatedTasks.map(task => ({
    task: task.task,
    day: task.day,
    dueDate: task.dueDate,
  }))
);
    console.log(generatedTasks);

setTasks([
  ...tasks,
  ...generatedTasks,
]);
console.log("APP TASKS AFTER SAVE:", generatedTasks);

alert("🎉 Roadmap added to your planner!");
}
  return (
    <div className="generator-card">
      <h2>✨ AI Study Roadmap Generator</h2>
      <p>Create an entire study plan in seconds.</p>
      <div className="generator-form">

      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <textarea
        placeholder="Topics (one per line)"
        value={topics}
        onChange={(e) => setTopics(e.target.value)}
      />

      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      <input
        type="number"
        placeholder="Study hours per day"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
      />

      <button
  className="generator-btn"
  onClick={handleGenerate}
>
        ✨ Generate Study Plan
      </button>
      </div>
      {roadmap && (
  <div className="roadmap-preview"> 
    <h2>📅 Your AI Study Roadmap</h2>

    {roadmap.roadmap.map((day) => (
      <div key={day.day} className="roadmap-day">
        <h3>
          Day {day.day} - {day.title}
        </h3>

        <ul>
          {day.tasks.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>

        <p>
          ⏱ {day.estimatedMinutes} minutes
        </p>
    
      </div>
    ))}
    <button
  className="generator-btn"
  onClick={handleSaveRoadmap}
>
  💾 Save Roadmap to Calendar
</button>
  </div>
)}
    </div>
  );
}