import "./App.css";
import { useState } from "react";
import WelcomeModal from "./components/WelcomeModal";
import { loadStudentProfile } from "./agent/memory/profile";
import Header from "./components/Header";
import DashboardCards from "./components/DashboardCards";
import ProgressSection from "./components/ProgressSection";
import TaskSection from "./components/TaskSection";
import ExamSection from "./components/ExamSection";
import CalendarSection from "./components/CalendarSection";
import GeneratePlan from "./components/GeneratePlan";
import MikuTeacher from "./components/MikuTeacher";

function App() {
 const [completedTasks, setCompletedTasks] = useState(0);
const [totalTasks, setTotalTasks] = useState(0);

const [subjects, setSubjects] = useState(0);
const [taskCount, setTaskCount] = useState(0);
const [examCount, setExamCount] = useState(0);
const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks) {
    return JSON.parse(savedTasks);
  }

  return [];
});
const [exams, setExams] = useState([]);
const [showWelcome, setShowWelcome] = useState(
  !loadStudentProfile().name
);
const [studentName, setStudentName] = useState(
  loadStudentProfile().name
);

  function handleProgressChange(completed, total) {
    setCompletedTasks(completed);
    setTotalTasks(total);
  }
  function handleSubjectChange(count) {
  setSubjects(count);
}

  return (
  <div className="container">
    {showWelcome && (
  <WelcomeModal
    onComplete={(name) => {
      setStudentName(name);
      setShowWelcome(false);
    }}
  />
)}

    <Header studentName={studentName} />

    <DashboardCards
      subjects={subjects}
      totalTasks={totalTasks}
      taskCount={taskCount}
      completedTasks={completedTasks}
      examCount={examCount}
    />

    <ProgressSection
      completedTasks={completedTasks}
      totalTasks={totalTasks}
    />

    <TaskSection
  tasks={tasks}
  setTasks={setTasks}
  onProgressChange={handleProgressChange}
  onSubjectChange={handleSubjectChange}
  onTaskCountChange={setTaskCount}
/>

    <ExamSection
      onExamCountChange={setExamCount}
      onExamsChange={setExams}
    />

    <GeneratePlan
      tasks={tasks}
      setTasks={setTasks}
    />

    <CalendarSection
      tasks={tasks}
      exams={exams}
    />
    <MikuTeacher
  tasks={tasks}
  exams={exams}
/>
  </div>
);
}

export default App;