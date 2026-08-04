import { useState } from "react"; 
import { askMiku } from "../agent/miku";
import { extractMemory } from "../agent/memoryExtractor";
import { addMemory } from "../utils/mikuMemory";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

function MikuTeacher({ tasks, exams }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
  {
    sender: "miku",
    text: "👋 Hi! I'm Miku Teacher.\n\nAsk me anything about your studies."
  }
]);

const [question, setQuestion] = useState("");
const [isTyping, setIsTyping] = useState(false);


async function sendMessage(customQuestion = "") {

  const userQuestion =
    typeof customQuestion === "string" && customQuestion.length > 0
      ? customQuestion
      : question;
      const lowerQuestion = userQuestion.toLowerCase();

if (lowerQuestion.includes("i don't understand") ||
    lowerQuestion.includes("i dont understand") ||
    lowerQuestion.includes("confused")) {

  addMemory(`Student struggles with: ${userQuestion}`);
}

if (lowerQuestion.includes("exam")) {
  addMemory(`Student is preparing for an exam.`);
}

if (lowerQuestion.includes("rest api")) {
  addMemory("Student is learning REST API.");
}

if (lowerQuestion.includes("sql")) {
  addMemory("Student is learning SQL.");
}

if (lowerQuestion.includes("python")) {
  addMemory("Student is learning Python.");
}

if (lowerQuestion.includes("java")) {
  addMemory("Student is learning Java.");
}

  if (!userQuestion.trim()) return;

  // Show the user's message immediately
  setMessages((prev) => [
    ...prev,
    {
      sender: "user",
      text: userQuestion,
    },
  ]);

  setQuestion("");

  const memory = await extractMemory(userQuestion);

if (
  memory &&
  memory.toLowerCase() !== "none"
) {
  addMemory(memory);
}

  try {
    setIsTyping(true);
    const reply = await askMiku(userQuestion, {
  tasks,
  exams,
  currentTime: new Date().toLocaleString(),
});
    setIsTyping(false);

    setMessages((prev) => [
      ...prev,
      {
        sender: "miku",
        text: reply,
      },
    ]);
  } catch (error) {
    setIsTyping(false);
    setMessages((prev) => [
      ...prev,
      {
        sender: "miku",
        text: "Sorry 😅 I couldn't answer right now. Please try again.",
      },
    ]);

    console.error(error);
  }
}

  return (
    <>
  <div className="miku-floating-container">

    <button
      className="miku-floating-btn"
      onClick={() => setOpen(true)}
    >
      🌸
    </button>

    <div className="miku-label">
      Ask Miku
    </div>

  </div>

      {/* Chat Window */}
{open && (
  <div className="miku-chat">

    <div className="miku-header">
      <h3>🌸 Miku Teacher</h3>

      <button
        className="miku-close"
        onClick={() => setOpen(false)}
      >
        ✕
      </button>
    </div>

    <div className="miku-messages">

  {messages.map((msg, index) => (
    <div
      key={index}
      className={`miku-message-wrapper ${msg.sender}`}
    >

      {msg.sender === "miku" && (
        <div className="avatar miku-avatar">
          🌸
        </div>
      )}

      <div className={`miku-message ${msg.sender}`}>

        <div className="message-label">
          {msg.sender === "user" ? "You" : "Miku Teacher"}
        </div>

        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {msg.text}
        </ReactMarkdown>

      </div>

      {msg.sender === "user" && (
        <div className="avatar user-avatar">
          👤
        </div>
      )}

    </div>
  ))}

  {isTyping && (
    <div className="miku-message-wrapper miku">

      <div className="avatar miku-avatar">
        🌸
      </div>

      <div className="miku-message miku typing-bubble">

        <div className="message-label">
          Miku Teacher
        </div>

        <div className="typing">
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>

    </div>
  )}

</div>
{messages.length === 1 && (
  <div className="quick-prompts">

    <button onClick={() => sendMessage("What should I study today?")}>
      📅 What should I study today?
    </button>

    <button onClick={() => sendMessage("Make a study plan")}>
      📝 Make a study plan
    </button>

    <button onClick={() => sendMessage("Explain a concept")}>
      🧠 Explain a concept
    </button>

  </div>
)}
    <div className="miku-input">

      <input
  type="text"
  placeholder="Ask Miku..."
  value={question}
  onChange={(e) => setQuestion(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  }}
/>

      <button onClick={() => sendMessage()}>
  ➤
</button>

    </div>

  </div>
)}
  

    </>
  );
}

export default MikuTeacher;