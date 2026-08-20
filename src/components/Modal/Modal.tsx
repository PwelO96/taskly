import { useImperativeHandle, useRef, type Ref, type ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

export type ModalHandle = {
  open: () => void;
  close: () => void;
};

type ModalProps = {
  children: ReactNode;
  buttonCaption: string;
  actionBtnCaption: string;
  actionHandle: () => void;
  ref: Ref<ModalHandle>;
};

export default function Modal({
  children,
  buttonCaption,
  actionBtnCaption,
  actionHandle,
  ref,
}: ModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    open: () => dialog.current?.showModal(),
    close: () => dialog.current?.close(),
  }));

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return createPortal(
    <dialog ref={dialog} className={styles.modal}>
      {children}
      <div className={styles.modalBtnsWrapper}>
        <form method="dialog">
          <button className={styles.cancelBtn}>{buttonCaption}</button>
        </form>
        <button onClick={actionHandle} className={styles.removeBtn}>
          {actionBtnCaption}
        </button>
      </div>
    </dialog>,
    modalRoot,
  );
}
