import styles from "./TodoList.module.css";
import TodoItem from "../TodoItem/TodoItem";
import { useTodos } from "../../hooks/useTodos";
import Modal, { type ModalHandle } from "../Modal/Modal";
import { useRef, useState } from "react";
import type { Todo, SortBy, StatusFilter } from "../../types/todo";
import EmptyTodoList from "../EmptyTodoList/EmptyTodoList";

type TodoListProps = {
  sortBy: SortBy;
  searchQuery: string;
  statusFilter: StatusFilter;
};

const priorityWeights: Record<string, number> = {
  low: 0,
  medium: 1,
  high: 2,
};

export default function TodoList({
  sortBy,
  searchQuery,
  statusFilter,
}: TodoListProps) {
  const modal = useRef<ModalHandle>(null);
  const { todos, isLoading, error, removeTodo } = useTodos();
  const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);

  const isTodosExist = todos.length === 0;

  const modalHandler = () => {
    modal.current?.open();
  };

  const removeHandler = (id: string) => {
    removeTodo(id);
    setTodoToDelete(null);
    modal.current?.close();
  };

  const query = searchQuery.trim().toLowerCase();

  const searched = query
    ? todos.filter((el) => el.text.trim().toLowerCase().includes(query))
    : todos;

  const filtered =
    statusFilter === "active"
      ? searched.filter((el) => !el.is_checked)
      : statusFilter === "done"
        ? searched.filter((el) => el.is_checked)
        : searched;

  const visibleTodos = () => {
    const sorted = [...filtered];
    if (sortBy === "priority") {
      sorted.sort(
        (a, b) => priorityWeights[a.priority] - priorityWeights[b.priority],
      );
    } else if (sortBy === "dueDate") {
      sorted.sort((a, b) => a.due_date.localeCompare(b.due_date));
    } else if (sortBy === "newest") {
      sorted.sort((a, b) => b.created_at - a.created_at);
    }

    return sorted;
  };

  if (isLoading) return <p>Tasks loading...</p>;
  if (error)
    return (
      <p className={styles.error}>
        There is a problem:<br></br> {error}
      </p>
    );
  if (isTodosExist && !isLoading) return <EmptyTodoList />;

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
        {visibleTodos().map((todo) => (
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
