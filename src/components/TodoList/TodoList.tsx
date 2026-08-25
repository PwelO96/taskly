import styles from "./TodoList.module.css";
import TodoItem from "../TodoItem/TodoItem";
import { useTodos } from "../../hooks/useTodos";
import Modal, { type ModalHandle } from "../Modal/Modal";
import { useRef, useState } from "react";
import type { Todo, SortBy } from "../../types/todo";
import EmptyTodoList from "../EmptyTodoList/EmptyTodoList";

type TodoListProps = {
  sortBy: SortBy;
};

export default function TodoList({ sortBy }: TodoListProps) {
  const modal = useRef<ModalHandle>(null);
  const { todos, removeTodo } = useTodos();
  const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);

  const priorityWeights: Record<string, number> = {
    low: 0,
    medium: 1,
    high: 2,
  };

  const isTodosExist = todos.length === 0;

  const modalHandler = () => {
    modal.current?.open();
  };

  const removeHandler = (id: string) => {
    removeTodo(id);
    setTodoToDelete(null);
    modal.current?.close();
  };

  const sortTodos = () => {
    const sortedTodos = [...todos];

    if (sortBy === "priority") {
      sortedTodos.sort(
        (a, b) => priorityWeights[a.priority] - priorityWeights[b.priority],
      );
    } else if (sortBy === "dueDate") {
      sortedTodos.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
    } else if (sortBy === "newest") {
      sortedTodos.sort((a, b) => b.createdDate - a.createdDate);
    }

    return sortedTodos;
  };

  if (isTodosExist) return <EmptyTodoList />;

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
        {sortTodos().map((todo) => (
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
