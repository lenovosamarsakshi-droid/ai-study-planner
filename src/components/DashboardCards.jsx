function DashboardCards({
  subjects,
  totalTasks,
  taskCount,
  completedTasks,
  examCount,
}) {
  const progress =
  totalTasks === 0
    ? 0
    : Math.round((completedTasks / totalTasks) * 100);
  return (
    <div className="dashboard">
      <div className="card">
        <h3>📚 Subjects</h3>
       <p>{subjects}</p>
      </div>

      <div className="card">
        <h3>✅ Tasks</h3>
       <p>{taskCount}</p>
      </div>

      <div className="card">
  <h3>📅 Exams</h3>
  <p>{examCount}</p>
</div>
    </div>
  );
}

export default DashboardCards;