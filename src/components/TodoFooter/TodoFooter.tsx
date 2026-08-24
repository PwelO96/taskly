import { useTodos } from "../../hooks/useTodos";
import styles from "./TodoFooter.module.css";
import Modal, { type ModalHandle } from "../Modal/Modal";
import { createPortal } from "react-dom";
import { useRef } from "react";

type FooterProps = {
  text: string;
  text2: string;
};

export default function TodoFooter({ text, text2 }: FooterProps) {
  const modal = useRef<ModalHandle>(null);
  const { todos, removeCheckedTodos } = useTodos();

  const isTodosExist = todos.length === 0;

  const remainingTodos = todos.filter((todo) => !todo.isChecked).length;
  const checkedTodos = todos.filter((todo) => todo.isChecked).length;

  const modalContainer = document.getElementById("modal-root");
  if (!modalContainer) return null;

  const modalHandler = () => {
    modal.current?.open();
  };

  const removeHandler = () => {
    removeCheckedTodos();
    modal.current?.close();
  };

  if (isTodosExist) return;

  return (
    <>
      {createPortal(
        <Modal
          ref={modal}
          buttonCaption="Close"
          actionBtnCaption="Remove"
          actionHandle={removeHandler}
        >
          Are you sure you want to delete all finished tasks?
        </Modal>,
        modalContainer,
      )}

      <div className={styles.footerWrapper}>
        <p className={styles.todoFooter}>
          {text}
          <span className={styles.leftNumber}> {remainingTodos}</span>
        </p>
        {checkedTodos >= 1 && (
          <p onClick={modalHandler} className={styles.todoFooterDelete}>
            {text2}
            <span>{`(${checkedTodos})`}</span>
          </p>
        )}
      </div>
    </>
  );
}
