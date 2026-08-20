import styles from "./TodoList.module.css";
import TodoItem from "../TodoItem/TodoItem";
import { useTodos } from "../../hooks/useTodos";

export default function TodoList() {
  const { todos } = useTodos();

  return (
    <ul className={styles.todoList}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
