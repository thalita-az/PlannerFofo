export function createTask(title) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title: title.trim(),
    completed: false,
  };
}

export function toggleTask(tasks, taskId) {
  return tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
}
