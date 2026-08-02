import { useState, useEffect } from "react";

function TaskSection({
  onProgressChange,
  onSubjectChange,
  onTaskCountChange,
}) {
  const [task, setTask] = useState("");
const [subject, setSubject] = useState("Mathematics");
const [dueDate, setDueDate] = useState("");
const [priority, setPriority] = useState("Medium");
const [filterSubject, setFilterSubject] = useState("All");
const [filterPriority, setFilterPriority] = useState("All");
const [search, setSearch] = useState("");

 const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks) {
    return JSON.parse(savedTasks);
  }

 return [
  {
    subject: "Mathematics",
    task: "Complete Algebra Worksheet",
    dueDate: "2026-08-10",
    priority: "High",
    completed: false,
  },
  {
    subject: "Chemistry",
    task: "Revise Chemistry Chapter 3",
    dueDate: "2026-08-12",
    priority: "Medium",
    completed: false,
  },
  {
    subject: "English",
    task: "Read English Literature",
    dueDate: "2026-08-15",
    priority: "Low",
    completed: false,
  },
];
});
const [editingIndex, setEditingIndex] = useState(null);

const [editTask, setEditTask] = useState({
  subject: "",
  task: "",
  dueDate: "",
  priority: "Medium",
});
  useEffect(() => {

  const completed =
    tasks.filter(task => task.completed).length;

  onProgressChange(completed, tasks.length);
  onTaskCountChange(tasks.length);

  const uniqueSubjects =
    [...new Set(tasks.map(task => task.subject))];

  onSubjectChange(uniqueSubjects.length);

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );

}, [tasks, onProgressChange, onSubjectChange]);

  function addTask() {
    if (task.trim() === "") return;

   setTasks([
  ...tasks,
  {
    subject: subject,
    task: task,
    dueDate: dueDate,
    priority: priority,
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
  function startEditing(index) {
  setEditingIndex(index);
  setEditTask({ ...tasks[index] });
}
function saveEditedTask() {
  const updatedTasks = [...tasks];

  updatedTasks[editingIndex] = editTask;

  setTasks(updatedTasks);

  setEditingIndex(null);

  setEditTask({
    subject: "",
    task: "",
    dueDate: "",
    priority: "Medium",
  });
}

  function toggleTask(index) {
    const updatedTasks = [...tasks];

    updatedTasks[index].completed =
      !updatedTasks[index].completed;

    setTasks(updatedTasks);
  }

  return (
    <div className="task-box">
      <h2>Today's Tasks</h2>
      <div className="search-box">
  <input
    type="text"
    placeholder="🔍 Search tasks..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>

<div className="filters">

  <div className="filter-group">
    <label>📚 Subject</label>

    <select
      value={filterSubject}
      onChange={(e) => setFilterSubject(e.target.value)}
    >
      <option value="All">All</option>
      <option value="Mathematics">Mathematics</option>
      <option value="Physics">Physics</option>
      <option value="Chemistry">Chemistry</option>
      <option value="English">English</option>
      <option value="Computer Science">Computer Science</option>
    </select>
  </div>

  <div className="filter-group">
    <label>🎯 Priority</label>

    <select
      value={filterPriority}
      onChange={(e) => setFilterPriority(e.target.value)}
    >
      <option value="All">All</option>
      <option value="High">High</option>
      <option value="Medium">Medium</option>
      <option value="Low">Low</option>
    </select>
  </div>

</div>

<div className="task-input">

  <select
    value={editingIndex === null ? subject : editTask.subject}
onChange={(e) =>
  editingIndex === null
    ? setSubject(e.target.value)
    : setEditTask({ ...editTask, subject: e.target.value })
}
  >
    <option>Mathematics</option>
    <option>Physics</option>
    <option>Chemistry</option>
    <option>English</option>
    <option>Computer Science</option>
  </select>
<input
  type="text"
  value={editingIndex === null ? task : editTask.task}
  onChange={(e) =>
    editingIndex === null
      ? setTask(e.target.value)
      : setEditTask({ ...editTask, task: e.target.value })
  }
/>

  <input
    type="date"
    value={editingIndex === null ? dueDate : editTask.dueDate}
onChange={(e) =>
  editingIndex === null
    ? setDueDate(e.target.value)
    : setEditTask({ ...editTask, dueDate: e.target.value })
}
  />

  <select
    value={editingIndex === null ? priority : editTask.priority}
onChange={(e) =>
  editingIndex === null
    ? setPriority(e.target.value)
    : setEditTask({ ...editTask, priority: e.target.value })
}
  >
    <option>High</option>
    <option>Medium</option>
    <option>Low</option>
  </select>

 {editingIndex === null ? (
  <button onClick={addTask}>
    Add Task
  </button>
) : (
  <button onClick={saveEditedTask}>
    Save Changes
  </button>
)}

</div>

      {tasks.length === 0 ? (
  <div style={{ textAlign: "center", padding: "25px" }}>
    <h3>🎉 No tasks yet!</h3>
    <p>Add your first task to start studying.</p>
  </div>
) : (
  <ul>
    {tasks
  .filter((item) => {
    const subjectMatch =
      filterSubject === "All" || item.subject === filterSubject;

    const priorityMatch =
      filterPriority === "All" || item.priority === filterPriority;

    const searchMatch =
      item.subject.toLowerCase().includes(search.toLowerCase()) ||
      item.task.toLowerCase().includes(search.toLowerCase()) ||
      item.priority.toLowerCase().includes(search.toLowerCase());

    return subjectMatch && priorityMatch && searchMatch;
  })
  .map((item, index) => (
      <li key={index} className="task-item">
        <div className="task-left">
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => toggleTask(index)}
          />

          <div className={item.completed ? "completed-task" : ""}>

  <h4 className="task-subject">
  📚 {item.subject}
</h4>

 <p className="task-name">
  📝 {item.task}
</p>

  <div className="task-details">
    <span>
      📅{" "}
      {new Date(item.dueDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })}
    </span>

    <span className={`priority ${item.priority.toLowerCase()}`}>
      {item.priority}
    </span>
  </div>

</div>
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
    onClick={() => deleteTask(index)}
  >
    🗑
  </button>
</div>
      </li>
    ))}
  </ul>
)}
    </div>
  );
}

export default TaskSection;