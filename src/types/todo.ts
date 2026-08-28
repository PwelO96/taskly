export type Todo = {
  id: string;
  text: string;
  priority: string;
  due_date: string;
  is_checked: boolean;
  created_at: number;
};

export type NewTodo = Omit<Todo, "id" | "is_checked" | "created_at">;

export type SortBy = "newest" | "priority" | "dueDate";

export type StatusFilter = "all" | "active" | "done";
