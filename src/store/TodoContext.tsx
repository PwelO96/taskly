import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Todo, NewTodo } from "../types/todo";
import {
  fetchTodos,
  insertTodo,
  updateTodo,
  deleteTodo,
  deleteCheckedTodos,
} from "../services/todos";

type TodoContextType = {
  todos: Todo[];
  isLoading: boolean;
  error: string;
  addTodo: (data: NewTodo) => void;
  toggleTodo: (id: string, isChecked: boolean) => void;
  editTodo: (id: string, text: string) => void;
  removeTodo: (id: string) => void;
  removeCheckedTodos: () => void;
};

export const TodoContext = createContext<TodoContextType | null>(null);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getTodos() {
      try {
        const data = await fetchTodos();
        setTodos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data!");
      } finally {
        setIsLoading(false);
      }
    }

    getTodos();
  }, []);

  const addTodo = async (newTodo: NewTodo) => {
    try {
      const data = await insertTodo(newTodo);
      setTodos((prevTodos) => [...prevTodos, data]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "There is a problem with add your task!",
      );
    }
  };

  const toggleTodo = async (id: string, isChecked: boolean) => {
    try {
      const updated = await updateTodo(id, { is_checked: isChecked });
      setTodos((prevTodos) =>
        prevTodos.map((task) => (task.id === id ? updated : task)),
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "There is a problem with change task status!",
      );
    }
  };

  const editTodo = async (id: string, todoText: string) => {
    try {
      const updated = await updateTodo(id, { text: todoText });
      setTodos((prevTodo) =>
        prevTodo.map((task) => (task.id === id ? updated : task)),
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "There is a problem with change task text!",
      );
    }
  };

  const removeTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos((prevTodo) => prevTodo.filter((task) => task.id !== id));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "There is a problem with delete this task!",
      );
    }
  };

  const removeCheckedTodos = async () => {
    try {
      await deleteCheckedTodos();
      setTodos((prevTodo) => prevTodo.filter((task) => !task.is_checked));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "There is a problem with delete done tasks!",
      );
    }
  };

  const TodoCtx = {
    todos,
    isLoading,
    error,
    addTodo,
    toggleTodo,
    editTodo,
    removeTodo,
    removeCheckedTodos,
  };

  return <TodoContext value={TodoCtx}>{children}</TodoContext>;
};
