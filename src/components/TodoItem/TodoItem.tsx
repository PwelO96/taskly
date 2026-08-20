import { useTodos } from "../../hooks/useTodos";
import styles from "./TodoItem.module.css";
import type { Todo } from "../../store/TodoContext";
import Modal, { type ModalHandle } from "../Modal/Modal";
import { useRef } from "react";

type TodoItemProps = {
  todo: Todo;
};

export default function TodoItem({
  todo: { text, id, isChecked },
}: TodoItemProps) {
  const modal = useRef<ModalHandle>(null);

  const { updateTodo, removeTodo } = useTodos();

  const changeCheckboxState = (id: string) => {
    updateTodo(id);
  };

  const modalHandler = () => {
    modal.current?.open();
  };

  const removeHandler = (id: string) => {
    removeTodo(id);
  };

  return (
    <>
      <Modal
        ref={modal}
        buttonCaption="Close"
        actionBtnCaption="Remove"
        actionHandle={() => {
          removeHandler(id);
        }}
      >
        <p>Are you sure you want to delete that item?</p>
      </Modal>
      <li className={styles.todoItem}>
        <div className={styles.todoContent}>
          <input
            type="checkbox"
            checked={isChecked}
            className={styles.todoCheckbox}
            onChange={() => changeCheckboxState(id)}
          />
          <span className={isChecked ? styles.todoChecked : styles.todoText}>
            {text}
          </span>
        </div>
        <button className={styles.btnDelete} onClick={modalHandler}>
          🗑️
        </button>
      </li>
    </>
  );
}
