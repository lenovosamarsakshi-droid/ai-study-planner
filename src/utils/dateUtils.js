export function getDaysLeft(date) {
  const today = new Date();
  const examDate = new Date(date);

  const difference =
    examDate.setHours(0, 0, 0, 0) -
    today.setHours(0, 0, 0, 0);

  const days = Math.ceil(
    difference / (1000 * 60 * 60 * 24)
  );

  if (days < 0)
    return {
      text: "Exam Passed",
      className: "expired",
    };

  if (days === 0)
    return {
      text: "Today",
      className: "today",
    };

  if (days === 1)
    return {
      text: "Tomorrow",
      className: "tomorrow",
    };

  return {
    text: `${days} days left`,
    className: "upcoming",
  };
}