import { useImperativeHandle, useRef, type Ref, type ReactNode } from "react";
import { createPortal } from "react-dom";

export type ModalHandle = {
  open: () => void;
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
  }));

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return createPortal(
    <dialog ref={dialog}>
      {children}
      <form method="dialog">
        <button>{buttonCaption}</button>
      </form>
      <button onClick={actionHandle}>{actionBtnCaption}</button>
    </dialog>,
    modalRoot,
  );
}
