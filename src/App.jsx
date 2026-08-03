import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import DashboardCards from "./components/DashboardCards";
import ProgressSection from "./components/ProgressSection";
import TaskSection from "./components/TaskSection";
import ExamSection from "./components/ExamSection";
import CalendarSection from "./components/CalendarSection";
import GeneratePlan from "./components/GeneratePlan";

function App() {
 const [completedTasks, setCompletedTasks] = useState(0);
const [totalTasks, setTotalTasks] = useState(0);

const [subjects, setSubjects] = useState(0);
const [taskCount, setTaskCount] = useState(0);
const [examCount, setExamCount] = useState(0);
const [tasks, setTasks] = useState([]);
const [exams, setExams] = useState([]);

  function handleProgressChange(completed, total) {
    setCompletedTasks(completed);
    setTotalTasks(total);
  }
  function handleSubjectChange(count) {
  setSubjects(count);
}

  return (
    <div className="container">
      <Header />

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
  onProgressChange={handleProgressChange}
  onSubjectChange={handleSubjectChange}
  onTaskCountChange={setTaskCount}
  onTasksChange={setTasks}
/>
      <ExamSection
  onExamCountChange={setExamCount}
  onExamsChange={setExams}
/>
<GeneratePlan />
<CalendarSection
  tasks={tasks}
  exams={exams}
/>
    </div>
  );
}

export default App;