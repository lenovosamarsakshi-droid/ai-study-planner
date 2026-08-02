import { useState, useEffect } from "react";

function TaskSection({ onProgressChange }) {
  const [task, setTask] = useState("");
const [subject, setSubject] = useState("Mathematics");
const [dueDate, setDueDate] = useState("");

 const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks) {
    return JSON.parse(savedTasks);
  }

  return [
    { text: "📖 Complete Algebra Worksheet", completed: false },
    { text: "🧪 Revise Chemistry Chapter 3", completed: false },
    { text: "📘 Read English Literature", completed: false },
  ];
});

  useEffect(() => {
  const completed = tasks.filter((task) => task.completed).length;

  onProgressChange(completed, tasks.length);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks, onProgressChange]);

  function addTask() {
    if (task.trim() === "") return;

    setTasks([
      ...tasks,
      {
       text: `${subject} - ${task} | 📅 ${dueDate}`,
        completed: false,
      },
    ]);

    setTask("");
  }

  function deleteTask(indexToDelete) {
    const updatedTasks = tasks.filter(
      (_, index) => index !== indexToDelete
    );

    setTasks(updatedTasks);
  }

  function toggleTask(index) {
    const updatedTasks = [...tasks];

    updatedTasks[index].completed =
      !updatedTasks[index].completed;

    setTasks(updatedTasks);
  }

  return (
    <div className="task-box">
      <h3>Today's Tasks</h3>

      <div className="task-input">
        <select
  value={subject}
  onChange={(e) => setSubject(e.target.value)}
>
  <option>Mathematics</option>
  <option>Physics</option>
  <option>Chemistry</option>
  <option>English</option>
  <option>Computer Science</option>
</select>
        <input
          type="text"
          placeholder="Enter a new task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <input
  type="date"
  value={dueDate}
  onChange={(e) => setDueDate(e.target.value)}
/>

        <button onClick={addTask}>
          Add Task
        </button>
      </div>

      {tasks.length === 0 ? (
  <div style={{ textAlign: "center", padding: "25px" }}>
    <h3>🎉 No tasks yet!</h3>
    <p>Add your first task to start studying.</p>
  </div>
) : (
  <ul>
    {tasks.map((item, index) => (
      <li key={index} className="task-item">
        <div className="task-left">
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => toggleTask(index)}
          />

          <span
            className={item.completed ? "completed-task" : ""}
          >
            {item.text}
          </span>
        </div>

        <button
          className="delete-btn"
          onClick={() => deleteTask(index)}
        >
          🗑️
        </button>
      </li>
    ))}
  </ul>
)}
    </div>
  );
}

export default TaskSection;