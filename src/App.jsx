import { useState } from "react";
import Header from "./components/Header";
import DashboardCards from "./components/DashboardCards";
import ProgressSection from "./components/ProgressSection";
import TaskSection from "./components/TaskSection";

function App() {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);

  function handleProgressChange(completed, total) {
    setCompletedTasks(completed);
    setTotalTasks(total);
  }

  return (
    <div className="container">
      <Header />

      <DashboardCards />

      <ProgressSection
        completedTasks={completedTasks}
        totalTasks={totalTasks}
      />

      <TaskSection
        onProgressChange={handleProgressChange}
      />
    </div>
  );
}

export default App;