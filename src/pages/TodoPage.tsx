import { useState } from "react";
import Header from "../components/Header/Header";
import NewTodo from "../components/NewTodo/NewTodo";
import TodoFooter from "../components/TodoFooter/TodoFooter";
import TodoList from "../components/TodoList/TodoList";
import TodoToolbar from "../components/TodoToolbar/TodoToolbar";
import styles from "./TodoPage.module.css";
import type { SortBy } from "../types/todo";

export default function TodoPage() {
  const [sortBy, setSortBy] = useState<SortBy>("newest");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className={styles.todoSection}>
      <div className={styles.todoContainer}>
        <Header text="📝 My Task List" />
        <TodoToolbar
          sortBy={sortBy}
          onSortChange={setSortBy}
          searchQuery={searchQuery}
          onSerachChange={setSearchQuery}
        />
        <NewTodo />
        <TodoList sortBy={sortBy} searchQuery={searchQuery} />
        <TodoFooter
          text="Pozostało zadań do zrobienia:"
          deleteAlltext="Usuń zrobione "
        />
      </div>
    </section>
  );
}
