import type { SortBy } from "../../types/todo";
import Input from "../UI/Input";
import styles from "./TodoToolbar.module.css";

type TodoToolbarProps = {
  sortBy: SortBy;
  onSortChange: (value: SortBy) => void;
  searchQuery: string;
  onSerachChange: (value: string) => void;
};

export default function TodoToolbar({
  sortBy,
  searchQuery,
  onSortChange,
  onSerachChange,
}: TodoToolbarProps) {
  return (
    <div className={styles.todoToolbar}>
      <Input
        value={searchQuery}
        onChange={(e) => onSerachChange(e.target.value)}
        type="search"
        placeholder="Search task..."
      />
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as SortBy)}
        className={styles.todoSort}
      >
        <option value="newest">Newest</option>
        <option value="priority">Priority</option>
        <option value="dueDate">Due Date</option>
      </select>
    </div>
  );
}
