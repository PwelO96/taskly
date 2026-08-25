import { useTodos } from "../../hooks/useTodos";
import styles from "./TodoFilters.module.css";
import type { StatusFilter } from "../../types/todo";

type TodoFiltersProps = {
  filter: StatusFilter;
  filterHandler: (value: StatusFilter) => void;
};

export default function TodoFilters({
  filter,
  filterHandler,
}: TodoFiltersProps) {
  const { todos } = useTodos();

  const filters = ["all", "active", "done"] as const;

  const counts = {
    all: todos.length,
    active: todos.filter((todo) => !todo.isChecked).length,
    done: todos.filter((todo) => todo.isChecked).length,
  };

  const labels: Record<StatusFilter, string> = {
    all: "All",
    active: "Active",
    done: "Done",
  };

  return (
    <div className={styles.todoFilters}>
      {filters.map((option) => (
        <button
          key={option}
          onClick={() => filterHandler(option)}
          className={`${styles.filterBtn} ${filter === option ? styles.active : ""}`}
        >{`${labels[option]}: ${counts[option]}`}</button>
      ))}
    </div>
  );
}
