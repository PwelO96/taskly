export type Todo = {
  id: string;
  text: string;
  priority: string;
  dueDate: string;
  isChecked: boolean;
  createdDate: number;
};

export type NewTodo = Omit<Todo, "id" | "isChecked" | "createdDate">;

export type SortBy = "newest" | "priority" | "dueDate";
