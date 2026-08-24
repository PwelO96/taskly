import { useTodos } from "../../hooks/useTodos";
import styles from "./TodoItem.module.css";
import type { Todo } from "../../store/TodoContext";
import { formatDueDate, isOverdue } from "../../utils/date";

type TodoItemProps = {
  todo: Todo;
  onRequestDelete: () => void;
};

const badgeStyles: Record<string, string> = {
  low: styles.badgeLow,
  medium: styles.badgeMid,
  high: styles.badgeHigh,
};

export default function TodoItem({
  todo: { text, id, isChecked, priority, dueDate },
  onRequestDelete,
}: TodoItemProps) {
  const { updateTodo } = useTodos();

  const overdue = dueDate !== "" && !isChecked && isOverdue(dueDate);

  return (
    <li className={styles.todoItem}>
      <label className={styles.todoContent}>
        <input
          type="checkbox"
          checked={isChecked}
          className={styles.todoCheckbox}
          onChange={() => updateTodo(id)}
        />
        <div className={styles.todoTextWrapper}>
          <span className={isChecked ? styles.todoChecked : styles.todoText}>
            {text}
          </span>
          <div className={styles.taskDetailsWrapper}>
            <span className={`${styles.badge} ${badgeStyles[priority]}`}>
              {priority}
            </span>
            {dueDate && (
              <span
                className={`${styles.dueDate} ${overdue ? styles.overdue : undefined}`}
              >
                📅 {formatDueDate(dueDate)}
              </span>
            )}
          </div>
        </div>
      </label>
      <button className={styles.btnDelete} onClick={onRequestDelete}>
        🗑️
      </button>
    </li>
  );
}
