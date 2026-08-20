import { useTodos } from "../../hooks/useTodos";
import styles from "./TodoItem.module.css";
import type { Todo } from "../../store/TodoContext";

type TodoItemProps = {
  todo: Todo;
  onRequestDelete: () => void;
};

export default function TodoItem({
  todo: { text, id, isChecked },
  onRequestDelete,
}: TodoItemProps) {
  const { updateTodo } = useTodos();

  const changeCheckboxState = (id: string) => {
    updateTodo(id);
  };

  return (
    <li className={styles.todoItem}>
      <label className={styles.todoContent}>
        <input
          type="checkbox"
          checked={isChecked}
          className={styles.todoCheckbox}
          onChange={() => changeCheckboxState(id)}
        />
        <span className={isChecked ? styles.todoChecked : styles.todoText}>
          {text}
        </span>
      </label>
      <button className={styles.btnDelete} onClick={onRequestDelete}>
        🗑️
      </button>
    </li>
  );
}
