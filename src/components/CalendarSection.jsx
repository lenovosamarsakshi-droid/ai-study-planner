import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState, useEffect } from "react";
import * as groqService from "../services/groq";
export default function CalendarSection({
  tasks,
  exams,
}) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [aiAdvice, setAiAdvice] = useState("Loading AI advice...");
    const selectedTasks = tasks.filter(
  task =>
    new Date(task.dueDate).toDateString() ===
    selectedDate.toDateString()
);

const selectedExams = exams.filter(
  exam =>
    new Date(exam.date).toDateString() ===
    selectedDate.toDateString()
);
const upcomingItems = [
  ...tasks
    .filter(task => task.dueDate)
    .map(task => ({
      title: task.task,
      date: task.dueDate,
      type: "Task",
    })),

  ...exams
    .filter(exam => exam.date)
    .map(exam => ({
      title: exam.subject,
      date: exam.date,
      type: "Exam",
    })),
]
.sort((a, b) => new Date(a.date) - new Date(b.date))
.slice(0, 5);
    console.log(tasks);
console.log(exams);
useEffect(() => {
  async function loadAdvice() {
    try {
      const advice = await groqService.getStudyAdvice(tasks, exams);
      setAiAdvice(advice);
    } catch (error) {
      console.error(error);
      setAiAdvice("Unable to generate AI advice.");
    }
  }

  loadAdvice();
}, [tasks, exams]);
  return (
    <div className="task-box">
      <h2>📅 Study Calendar</h2>
      <div className="upcoming-card">
  <h3>⏰ Upcoming Deadlines</h3>

  {upcomingItems.length === 0 ? (
    <p>No upcoming deadlines.</p>
  ) : (
    upcomingItems.map((item, index) => (
      <div key={index} className="upcoming-item">
        <strong>
          {item.type === "Task" ? "📝" : "📚"} {item.title}
        </strong>

        <p
  className={
    (() => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const due = new Date(item.date);
      due.setHours(0, 0, 0, 0);

      const diff = Math.floor(
        (due - today) / (1000 * 60 * 60 * 24)
      );

      if (diff === 0) return "deadline today";
      if (diff === 1) return "deadline tomorrow";
      if (diff <= 7) return "deadline soon";

      return "deadline future";
    })()
  }
>
  {(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(item.date);
    due.setHours(0, 0, 0, 0);

    const diff = Math.floor(
      (due - today) / (1000 * 60 * 60 * 24)
    );

    if (diff === 0) return "🔴 Today";
    if (diff === 1) return "🟠 Tomorrow";
    if (diff <= 7) return `🟡 In ${diff} days`;

    return due.toDateString();
  })()}
</p>
      </div>
    ))
  )}
</div>
      <Calendar
      onChange={setSelectedDate}
 tileContent={({ date, view }) => {
  if (view !== "month") return null;

  const hasTask = tasks.some((task) => {
    const match =
      new Date(task.dueDate).toDateString() ===
      date.toDateString();

    if (match) {
      console.log("Task Match:", task.dueDate);
    }

    return match;
  });

  const hasExam = exams.some((exam) => {
    const match =
      new Date(exam.date).toDateString() ===
      date.toDateString();

    if (match) {
      console.log("Exam Match:", exam.date);
    }

    return match;
  });

  return (
    <div className="calendar-dots">
      {hasTask && <span className="task-dot"></span>}
      {hasExam && <span className="exam-dot"></span>}
    </div>
  );
}}
/>

<div className="ai-card">
  <h3>🤖 AI Study Coach</h3>
  <p className="ai-subtitle">
    Personalized recommendations based on your tasks and exams
  </p>

  <div className="ai-response">
    {aiAdvice.split("\n").map((line, index) => {

      if (!line.trim()) return null;

      if (line.startsWith("Summary:")) {
        return (
          <div key={index}>
            <h4 className="summary-heading">📊 Summary</h4>
            <p>{line.replace("Summary:", "").trim()}</p>
          </div>
        );
      }

      if (line.startsWith("Priority:")) {
        return (
          <div key={index}>
            <h4 className="priority-heading">🎯 Priority</h4>
            <p>{line.replace("Priority:", "").trim()}</p>
          </div>
        );
      }

      if (line.startsWith("Today's Plan:")) {
        return (
          <h4 key={index} className="plan-heading">
            📅 Today's Plan
          </h4>
        );
      }

      if (line.startsWith("Motivation:")) {
        return (
          <div key={index}>
            <h4 className="motivation-heading">💪 Motivation</h4>
            <p>{line.replace("Motivation:", "").trim()}</p>
          </div>
        );
      }

      if (line.trim().startsWith("•")) {
        return (
          <p key={index}>✅ {line.replace("•", "").trim()}</p>
        );
      }

      return <p key={index}>{line}</p>;
    })}
  </div>
</div>

<div className="selected-date-card">
  <h3>📅 {selectedDate.toDateString()}</h3>

  <h4>📝 Tasks</h4>
  {selectedTasks.length === 0 ? (
    <p>No tasks.</p>
  ) : (
    <ul>
      {selectedTasks.map((task, index) => (
        <li key={index}>{task.task}</li>
      ))}
    </ul>
  )}

  <h4>📚 Exams</h4>
  {selectedExams.length === 0 ? (
    <p>No exams.</p>
  ) : (
    <ul>
      {selectedExams.map((exam, index) => (
        <li key={index}>{exam.subject}</li>
      ))}
    </ul>
  )}
</div>

    </div>
  );
}