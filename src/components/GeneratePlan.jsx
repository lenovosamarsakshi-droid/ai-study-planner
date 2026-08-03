import { useState } from "react";
import { createRoadmap } from "../agent/modules/roadmap";

export default function GeneratePlan() {
  const [subject, setSubject] = useState("");
  const [topics, setTopics] = useState("");
  const [deadline, setDeadline] = useState("");
  const [hours, setHours] = useState("");
  const [roadmap, setRoadmap] = useState(null);

  async function handleGenerate() {
  try {
    const result = await createRoadmap({
      subject,
      topics,
      deadline,
      hours,
    });

    console.log(result);

    setRoadmap(result);
  } catch (error) {
    console.error(error);
    alert("Failed to generate roadmap.");
  }
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
    </div>
  );
}