import { useState, useEffect } from "react";
import { getDaysLeft } from "../utils/dateUtils";

function ExamSection() {

  const [examSubject, setExamSubject] = useState("");
  const [examDate, setExamDate] = useState("");

  const [exams, setExams] = useState(() => {
  return JSON.parse(localStorage.getItem("exams")) || [];
});
  function addExam() {

    if (examSubject.trim() === "" || examDate === "") return;

    setExams([
      ...exams,
      {
        subject: examSubject,
        date: examDate,
      },
    ]);

    setExamSubject("");
    setExamDate("");
  }

useEffect(() => {
  localStorage.setItem(
    "exams",
    JSON.stringify(exams)
  );
}, [exams]);
   return (
  <div className="task-box">
    <h2>📚 Upcoming Exams</h2>

    <div className="exam-card">
      <input
        type="text"
        placeholder="Exam Subject"
        value={examSubject}
        onChange={(e) => setExamSubject(e.target.value)}
      />

      <input
        type="date"
        value={examDate}
        onChange={(e) => setExamDate(e.target.value)}
      />

      <button onClick={addExam}>
        Add Exam
      </button>
    </div>

    {exams.map((exam, index) => (
      <div key={index} className="exam-card">

        <div>
          <h3>📖 {exam.subject}</h3>

          <>
  <p>
    📅{" "}
    {new Date(exam.date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })}
  </p>

  <p>{getDaysLeft(exam.date)}</p>
</>
        </div>

        <button
          className="delete-btn"
          onClick={() =>
            setExams(exams.filter((_, i) => i !== index))
          }
        >
          🗑
        </button>

      </div>
    ))}
  </div>
);
}

export default ExamSection;