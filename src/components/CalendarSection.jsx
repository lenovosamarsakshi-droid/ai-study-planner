import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState, useEffect } from "react";
import { runAgent } from "../agent/brain";
export default function CalendarSection({
  tasks,
  exams,
}) {
    const [selectedDate, setSelectedDate] = useState(new Date());
   const [aiAdvice, setAiAdvice] = useState(null);
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

  const today = new Date().toDateString();

  const savedDate = localStorage.getItem("adviceDate");
  const savedAdvice = localStorage.getItem("aiAdvice");

  if (savedDate === today && savedAdvice) {
    setAiAdvice(JSON.parse(savedAdvice));
    return;
  }

  try {
    const advice = {
  analysis: {
    workload: "Medium",
    estimatedStudyHours: 2,
    riskLevel: "Low",
  },
  priority: {
    subject: "Math",
    reason: "Upcoming task",
  },
  todayPlan: [],
  warnings: [],
  coach: {
    motivation: "Keep going!",
  },
};

    const parsedAdvice =
      typeof advice === "string"
        ? JSON.parse(advice)
        : advice;

    localStorage.setItem(
      "aiAdvice",
      JSON.stringify(parsedAdvice)
    );

    localStorage.setItem(
      "adviceDate",
      today
    );

    setAiAdvice(parsedAdvice);

  } catch (error) {
    console.error(error);
    setAiAdvice(null);
  }
}

  loadAdvice();
}, []);
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
   {aiAdvice &&
 aiAdvice.analysis &&
 aiAdvice.priority &&
 Array.isArray(aiAdvice.todayPlan) &&
 Array.isArray(aiAdvice.warnings) &&
 aiAdvice.coach && (
  <>
   
    <h4 className="summary-heading">📊 Workload Analysis</h4>

    <p>
      <strong>Workload:</strong> {aiAdvice.analysis.workload}
    </p>

    <p>
      <strong>Estimated Study Time:</strong>{" "}
      {aiAdvice.analysis.estimatedStudyHours} hrs
    </p>

    <p>
      <strong>Risk Level:</strong> {aiAdvice.analysis.riskLevel}
    </p>

    <h4 className="priority-heading">🎯 Priority</h4>

    <p>
      <strong>Subject:</strong> {aiAdvice.priority.subject}
    </p>

    <p>
      <strong>Reason:</strong> {aiAdvice.priority.reason}
    </p>

    <h4 className="plan-heading">📅 Today's Plan</h4>

    {(aiAdvice.todayPlan || []).map((item, index) => (
      <p key={index}>
        ✅ {item.subject} - {item.task} ({item.duration} min)
      </p>
    ))}

    {aiAdvice.warnings.length > 0 && (
      <>
        <h4 className="priority-heading">⚠ Warnings</h4>

        {(aiAdvice.warnings || []).map((warning, index) => (
          <p key={index}>⚠ {warning}</p>
        ))}
      </>
    )}

    <h4 className="motivation-heading">💪 AI Coach</h4>

    <p>{aiAdvice.coach?.motivation || "No advice available."}</p>

  </>
)}
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