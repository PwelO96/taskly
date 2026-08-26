import { useTodos } from "../../hooks/useTodos";
import styles from "./TodoItem.module.css";
import type { Todo } from "../../types/todo";
import { formatDueDate, isOverdue } from "../../utils/date";
import { useState } from "react";
import Input from "../UI/Input";

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
  const { toggleTodo, editTodo } = useTodos();
  const [taskEdit, setTaskEdit] = useState(false);
  const [draftText, setDraftText] = useState(text);

  const overdue = dueDate !== "" && !isChecked && isOverdue(dueDate);

  const taskCancelEdit = () => {
    setDraftText(text);
    setTaskEdit(false);
  };

  const taskApproveEdit = () => {
    const trimmed = draftText.trim();
    if (!trimmed) return;
    editTodo(id, trimmed);
    setTaskEdit(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      taskApproveEdit();
    }
    if (e.key === "Escape") taskCancelEdit();
  };

  return (
    <li className={styles.todoItem}>
      {taskEdit ? (
        <Input
          type="text"
          value={draftText}
          onChange={(e) => setDraftText(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <label className={styles.todoContent}>
          {!taskEdit && (
            <input
              type="checkbox"
              checked={isChecked}
              className={styles.todoCheckbox}
              onChange={() => toggleTodo(id)}
            />
          )}
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
                  className={`${styles.dueDate} ${overdue ? styles.overdue : ""}`}
                >
                  📅 {formatDueDate(dueDate)}
                </span>
              )}
            </div>
          </div>
        </label>
      )}
      <div className={styles.todoActions}>
        {taskEdit ? (
          <div>
            <button
              title="Ok"
              className={styles.btnDelete}
              onClick={taskApproveEdit}
            >
              ✔️
            </button>
            <button
              title="Cancel"
              className={styles.btnDelete}
              onClick={taskCancelEdit}
            >
              ❌
            </button>
          </div>
        ) : (
          <div>
            <button
              title="Edit"
              className={styles.btnDelete}
              onClick={() => {
                setDraftText(text);
                setTaskEdit(true);
              }}
            >
              ✏️
            </button>
            <button
              title="Delete"
              className={styles.btnDelete}
              onClick={onRequestDelete}
            >
              🗑️
            </button>
          </div>
        )}
      </div>
    </li>
  );
}
