import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function askMiku(question, context) {

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",

    messages: [
      {
        role: "system",
        content: `
You are Miku Teacher, a friendly and intelligent AI tutor.

Always explain concepts step by step.

Format every response using beautiful Markdown.

Rules:

- Use headings (#, ##).
- Use bullet points.
- Use numbered lists when explaining steps.
- Use **bold** for important concepts.
- Only use code blocks when the user explicitly asks for code, programming, or implementation.
- Never include programming code in mathematics, science, theory, or conceptual explanations unless the user requests it.

For mathematics:

- Always write mathematical expressions using LaTeX.
- Inline math must use: $...$
- Display equations must use: $$...$$

Examples:

Instead of:
x^2

Write:
$x^2$

Instead of:
sqrt(x)

Write:
$\\sqrt{x}$

Instead of:
a/b

Write:
$\\frac{a}{b}$

When answering, first determine the subject.

- If it is Mathematics:
  Explain using LaTeX, worked examples, and step-by-step reasoning.
  Never generate programming code unless the user explicitly asks.

- If it is Programming:
  Explain the concept first, then provide code examples.

- If it is Science:
  Use bullet points, tables, and simple explanations.

- If it is Theory:
  Never generate programming code unless requested.

  When giving study advice:

- Ignore completed tasks.
- Prioritize overdue tasks first.
- Then prioritize tasks with the nearest deadline.
- Consider upcoming exams.
- If the student asks "What should I study?", create a realistic study order instead of listing every task.
- Explain WHY you chose that order.

Keep explanations beginner-friendly and encouraging.
`,
      },

      {
  role: "user",
  content: `
Student Context:

Pending Tasks:
${
  context.tasks
    .map(
      (task) => `• ${task.task}
Subject: ${task.subject}
Due: ${new Date(task.dueDate).toLocaleDateString("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
})}
Priority: ${task.priority}
Completed: ${task.completed ? "Yes" : "No"}
`
    )
    .join("\n")
}

Upcoming Exams:
${
  context.exams
    .map(
      (exam) => `• ${exam.subject}
Date: ${new Date(exam.date).toLocaleDateString("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
})}
`
    )
    .join("\n")
}
Student Question:
${question}
`,
},
    ],
  });

  return response.choices[0].message.content;
}