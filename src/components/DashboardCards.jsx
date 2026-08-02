function DashboardCards({
  subjects,
  totalTasks,
}) {
  return (
    <div className="dashboard">
      <div className="card">
        <h3>📚 Subjects</h3>
       <p>{subjects}</p>
      </div>

      <div className="card">
        <h3>✅ Tasks</h3>
       <p>{totalTasks}</p>
      </div>

      <div className="card">
        <h3>⏳ Hours</h3>
        <p>2.5</p>
      </div>
    </div>
  );
}

export default DashboardCards;