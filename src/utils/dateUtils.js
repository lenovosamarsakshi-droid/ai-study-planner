export function getDaysLeft(date) {
  const today = new Date();

  const examDate = new Date(date);

  const difference =
    examDate.setHours(0, 0, 0, 0) -
    today.setHours(0, 0, 0, 0);

  const days = Math.ceil(
    difference / (1000 * 60 * 60 * 24)
  );

  if (days === 0) return "🚨 Today";

  if (days === 1) return "⚠ Tomorrow";

  if (days < 0) return "❌ Exam Passed";

  return `⏳ ${days} days left`;
}