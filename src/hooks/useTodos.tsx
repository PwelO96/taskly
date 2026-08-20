import { useContext } from "react";
import { TodoContext } from "../store/TodoContext";

export const useTodos = () => {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodos must be used within TodoProvider");
  return ctx;
};
