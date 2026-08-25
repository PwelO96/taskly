import { useState } from "react";
import Header from "../components/Header/Header";
import NewTodo from "../components/NewTodo/NewTodo";
import TodoFooter from "../components/TodoFooter/TodoFooter";
import TodoList from "../components/TodoList/TodoList";
import TodoToolbar from "../components/TodoToolbar/TodoToolbar";
import TodoFilters from "../components/TodoFilters/TodoFilters";
import styles from "./TodoPage.module.css";
import type { SortBy, StatusFilter } from "../types/todo";

export default function TodoPage() {
  const [sortBy, setSortBy] = useState<SortBy>("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTodos, setActiveTodos] = useState<StatusFilter>("all");

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
        <TodoFilters filter={activeTodos} filterHandler={setActiveTodos} />
        <TodoList
          sortBy={sortBy}
          searchQuery={searchQuery}
          statusFilter={activeTodos}
        />
        <TodoFooter text="Tasks left: " deleteAlltext="Delete done " />
      </div>
    </section>
  );
}
