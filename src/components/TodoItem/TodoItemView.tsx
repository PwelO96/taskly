import styles from "./TodoItem.module.css";
import IconButton from "../UI/IconButton";
import type { Todo } from "../../types/todo";
import { formatDueDate, isOverdue } from "../../utils/date";

type TodoItemViewProps = {
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
  todo: Todo;
};

const badgeStyles: Record<string, string> = {
  low: styles.badgeLow,
  medium: styles.badgeMid,
  high: styles.badgeHigh,
};

export default function TodoItemView({
  onEdit,
  onDelete,
  onToggle,
  todo,
}: TodoItemViewProps) {
  const overdue =
    todo.due_date !== "" && !todo.is_checked && isOverdue(todo.due_date);
  const todoChecked = todo.is_checked;

  return (
    <>
      <label className={styles.todoContent}>
        <input
          type="checkbox"
          checked={todo.is_checked}
          className={styles.todoCheckbox}
          onChange={onToggle}
        />
        <div className={styles.todoTextWrapper}>
          <span
            className={todo.is_checked ? styles.todoChecked : styles.todoText}
          >
            {todo.text}
          </span>
          <div className={styles.taskDetailsWrapper}>
            <span
              className={`${styles.badge} ${badgeStyles[todo.priority]} ${todoChecked ? styles.badgeDone : ""}`}
            >
              {todo.priority}
            </span>
            {(todo.due_date && todoChecked) || (
              <span
                className={`${styles.dueDate} ${overdue ? styles.overdue : ""}`}
              >
                📅 {formatDueDate(todo.due_date)}
              </span>
            )}
          </div>
        </div>
      </label>
      <div className={styles.todoActions}>
        <IconButton title="Edit" onClick={onEdit}>
          ✏️
        </IconButton>
        <IconButton title="Delete" variant="danger" onClick={onDelete}>
          🗑️
        </IconButton>
      </div>
    </>
  );
}
