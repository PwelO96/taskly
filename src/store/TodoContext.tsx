import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Todo, NewTodo } from "../types/todo";

type TodoContextType = {
  todos: Todo[];
  addTodo: (data: NewTodo) => void;
  updateTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  removeCheckedTodos: () => void;
};

export const TodoContext = createContext<TodoContextType | null>(null);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const todosArr = localStorage.getItem("todos");
    return todosArr ? JSON.parse(todosArr) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = ({ text, priority, dueDate }: NewTodo) => {
    const id = crypto.randomUUID();
    const currentDate = new Date().getTime();

    setTodos((prevTodo) => [
      ...prevTodo,
      {
        id: id,
        text,
        priority,
        dueDate,
        isChecked: false,
        createdDate: currentDate,
      },
    ]);
  };

  const updateTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo,
      ),
    );
  };

  const removeTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const removeCheckedTodos = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.isChecked));
  };

  const TodoCtx = {
    todos,
    addTodo,
    updateTodo,
    removeTodo,
    removeCheckedTodos,
  };

  return <TodoContext value={TodoCtx}>{children}</TodoContext>;
};
