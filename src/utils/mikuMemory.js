export function loadMemory() {
  const memory = localStorage.getItem("mikuMemory");

  return memory ? JSON.parse(memory) : [];
}

export function saveMemory(memory) {
  localStorage.setItem(
    "mikuMemory",
    JSON.stringify(memory)
  );
}

export function addMemory(item) {
  const memory = loadMemory();

  // Avoid duplicate memories
  if (!memory.includes(item)) {
    memory.push(item);
    saveMemory(memory);
  }
}