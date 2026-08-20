import { useTodos } from "../../hooks/useTodos";
import styles from "./TodoItem.module.css";
import type { Todo } from "../../store/TodoContext";

type TodoItemProps = {
  todo: Todo;
};

export default function TodoItem({
  todo: { text, id, isChecked },
}: TodoItemProps) {
  const { updateTodo, removeTodo } = useTodos();

  const changeCheckboxState = (id: string) => {
    updateTodo(id);
  };

  const removeHandler = (id: string) => {
    removeTodo(id);
  };

  return (
    <li className={styles.todoItem}>
      <div className={styles.todoContent}>
        <input
          type="checkbox"
          checked={isChecked}
          className={styles.todoCheckbox}
          onClick={() => changeCheckboxState(id)}
        />
        <span className={isChecked ? styles.todoChecked : styles.todoText}>
          {text}
        </span>
      </div>
      <button className={styles.btnDelete} onClick={() => removeHandler(id)}>
        🗑️
      </button>
    </li>
  );
}
