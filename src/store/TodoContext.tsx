import { createContext, useEffect, useState, type ReactNode } from "react";

export type Todo = {
  id: string;
  text: string;
  isChecked: boolean;
};

type TodoContextType = {
  todos: Todo[];
  addTodo: (text: string) => void;
  updateTodo: (id: string) => void;
  removeTodo: (id: string) => void;
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

  const addTodo = (text: string) => {
    const id = new Date().toString();
    setTodos((prevTodo) => [...prevTodo, { id: id, text, isChecked: false }]);
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

  const TodoCtx = {
    todos,
    addTodo,
    updateTodo,
    removeTodo,
  };

  return <TodoContext value={TodoCtx}>{children}</TodoContext>;
};
