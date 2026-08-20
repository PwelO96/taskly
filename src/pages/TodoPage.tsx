import Header from "../components/Header/Header";
import NewTodo from "../components/NewTodo/NewTodo";
import TodoList from "../components/TodoList/TodoList";
import styles from "./TodoPage.module.css";

export default function TodoPage() {
  return (
    <section className={styles.todoSection}>
      <div className={styles.todoContainer}>
        <Header text="📝 My Task List" />
        <NewTodo />
        <TodoList />
      </div>
    </section>
  );
}
