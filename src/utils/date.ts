const DAY_MS = 86_400_000;

export const formatDueDate = (dueDate: string) => {
  const due = new Date(`${dueDate}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days = Math.round((due.getTime() - today.getTime()) / DAY_MS);

  if (days === 0) return "today";
  if (days === 1) return "tomorrow";
  if (days === -1) return "yesterday";

  return days > 0 ? `in ${days} days` : `${Math.abs(days)} days ago`;
};

export const isOverdue = (dueDate: string) => {
  const due = new Date(`${dueDate}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return due.getTime() < today.getTime();
};
