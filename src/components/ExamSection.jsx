import { useState, useEffect } from "react";
import { getDaysLeft } from "../utils/dateUtils";

function ExamSection() {

  const [examSubject, setExamSubject] = useState("");
  const [examDate, setExamDate] = useState("");

  const [exams, setExams] = useState(() => {
  return JSON.parse(localStorage.getItem("exams")) || [];
});
const [editingIndex, setEditingIndex] = useState(null);

const [editExam, setEditExam] = useState({
  subject: "",
  date: "",
});
function deleteExam(indexToDelete) {
  const updatedExams = exams.filter(
    (_, index) => index !== indexToDelete
  );

  setExams(updatedExams);
}
function startEditing(index) {
  setEditingIndex(index);
  setEditExam({ ...exams[index] });
}
function saveEditedExam() {
  if (
    editExam.subject.trim() === "" ||
    editExam.date === ""
  )
    return;

  const updatedExams = [...exams];

  updatedExams[editingIndex] = editExam;

  setExams(updatedExams);

  setEditingIndex(null);

  setEditExam({
    subject: "",
    date: "",
  });
}
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

<div className="exam-form">
      <input
  type="text"
  placeholder="Exam Subject"
  value={
    editingIndex !== null
      ? editExam.subject
      : examSubject
  }
  onChange={(e) =>
    editingIndex !== null
      ? setEditExam({
          ...editExam,
          subject: e.target.value,
        })
      : setExamSubject(e.target.value)
  }
/>

      <input
  type="date"
  value={
    editingIndex !== null
      ? editExam.date
      : examDate
  }
  onChange={(e) =>
    editingIndex !== null
      ? setEditExam({
          ...editExam,
          date: e.target.value,
        })
      : setExamDate(e.target.value)
  }
/>

      <button
  onClick={
    editingIndex !== null
      ? saveEditedExam
      : addExam
  }
>
  {editingIndex !== null
    ? "Save Changes"
    : "Add Exam"}
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

  {(() => {
  const countdown = getDaysLeft(exam.date);

  return (
    <span className={`countdown-badge ${countdown.className}`}>
      ⏳ {countdown.text}
    </span>
  );
})()}
</>
        </div>

        <div className="task-actions">
  <button
    className="edit-btn"
    onClick={() => startEditing(index)}
  >
    ✏️
  </button>

  <button
    className="delete-btn"
    onClick={() => deleteExam(index)}
  >
    🗑
  </button>
</div>

      </div>
    ))}
  </div>
);
}

export default ExamSection;