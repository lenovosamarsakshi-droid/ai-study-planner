import { useState } from "react";
import Header from "./components/Header";
import DashboardCards from "./components/DashboardCards";
import ProgressSection from "./components/ProgressSection";
import TaskSection from "./components/TaskSection";
import ExamSection from "./components/ExamSection";

function App() {
 const [completedTasks, setCompletedTasks] = useState(0);
const [totalTasks, setTotalTasks] = useState(0);

const [subjects, setSubjects] = useState(0);

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
/>

      <ProgressSection
        completedTasks={completedTasks}
        totalTasks={totalTasks}
      />

      <TaskSection
  onProgressChange={handleProgressChange}
  onSubjectChange={handleSubjectChange}
/>
      <ExamSection />
    </div>
  );
}

export default App;