function ProgressSection({ completedTasks, totalTasks }) {
  const percentage =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="progress-box">
      <h3>Today's Progress</h3>

      <progress value={percentage} max="100"></progress>

      <p>{percentage}% Completed</p>
    </div>
  );
}

export default ProgressSection;