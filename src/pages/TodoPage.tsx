import Header from "../components/Header/Header";
import NewTodo from "../components/NewTodo/NewTodo";
import TodoFooter from "../components/TodoFooter/TodoFooter";
import TodoList from "../components/TodoList/TodoList";
import TodoToolbar from "../components/TodoToolbar/TodoToolbar";
import styles from "./TodoPage.module.css";

export default function TodoPage() {
  return (
    <section className={styles.todoSection}>
      <div className={styles.todoContainer}>
        <Header text="📝 My Task List" />
        <TodoToolbar />
        <NewTodo />
        <TodoList />
        <TodoFooter
          text="Pozostało zadań do zrobienia:"
          text2="Usuń zrobione "
        />
      </div>
    </section>
  );
}
