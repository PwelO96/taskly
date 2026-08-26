import styles from "./TodoItem.module.css";
import IconButton from "../UI/IconButton";
import type { Todo } from "../../types/todo";
import { formatDueDate, isOverdue } from "../../utils/date";

type TodoItemsViewProps = {
  onEdit: () => void;
  onDelete: () => void;
  onToggle: (id: string) => void;
  todo: Todo;
};

const badgeStyles: Record<string, string> = {
  low: styles.badgeLow,
  medium: styles.badgeMid,
  high: styles.badgeHigh,
};

export default function TodoItemsView({
  onEdit,
  onDelete,
  onToggle,
  todo,
}: TodoItemsViewProps) {
  const overdue =
    todo.dueDate !== "" && !todo.isChecked && isOverdue(todo.dueDate);
  return (
    <>
      <label className={styles.todoContent}>
        <input
          type="checkbox"
          checked={todo.isChecked}
          className={styles.todoCheckbox}
          onChange={() => onToggle(todo.id)}
        />
        <div className={styles.todoTextWrapper}>
          <span
            className={todo.isChecked ? styles.todoChecked : styles.todoText}
          >
            {todo.text}
          </span>
          <div className={styles.taskDetailsWrapper}>
            <span className={`${styles.badge} ${badgeStyles[todo.priority]}`}>
              {todo.priority}
            </span>
            {todo.dueDate && (
              <span
                className={`${styles.dueDate} ${overdue ? styles.overdue : ""}`}
              >
                📅 {formatDueDate(todo.dueDate)}
              </span>
            )}
          </div>
        </div>
      </label>
      <div className={styles.todoActions}>
        <div>
          <IconButton title="Edit" onClick={onEdit}>
            ✏️
          </IconButton>
          <IconButton title="Delete" onClick={onDelete}>
            🗑️
          </IconButton>
        </div>
      </div>
    </>
  );
}
