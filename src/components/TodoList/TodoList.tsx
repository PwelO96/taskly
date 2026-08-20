import styles from "./TodoList.module.css";
import TodoItem from "../TodoItem/TodoItem";
import { useTodos } from "../../hooks/useTodos";
import Modal, { type ModalHandle } from "../Modal/Modal";
import { useRef, useState } from "react";
import type { Todo } from "../../store/TodoContext";

export default function TodoList() {
  const modal = useRef<ModalHandle>(null);
  const { todos, removeTodo } = useTodos();
  const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);

  const modalHandler = () => {
    modal.current?.open();
  };

  const removeHandler = (id: string) => {
    removeTodo(id);
    setTodoToDelete(null);
    modal.current?.close();
  };

  return (
    <>
      <Modal
        ref={modal}
        buttonCaption="Close"
        actionBtnCaption="Remove"
        actionHandle={() => {
          if (todoToDelete) removeHandler(todoToDelete.id);
        }}
      >
        <p>Are you sure you want to delete {todoToDelete?.text}</p>
      </Modal>
      <ul className={styles.todoList}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onRequestDelete={() => {
              setTodoToDelete(todo);
              modalHandler();
            }}
          />
        ))}
      </ul>
    </>
  );
}
