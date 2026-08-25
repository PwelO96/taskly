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
  const { todos, removeTodo } = useTodos();
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

  const visibleTodos = () => {
    const query = searchQuery.trim().toLowerCase();

    const filteredData = query
      ? todos.filter((el) => el.text.trim().toLowerCase().includes(query))
      : todos;

    if (statusFilter === "active")
      return filteredData.filter((el) => !el.isChecked);
    if (statusFilter === "done")
      return filteredData.filter((el) => el.isChecked);

    if (sortBy === "priority") {
      filteredData.sort(
        (a, b) => priorityWeights[a.priority] - priorityWeights[b.priority],
      );
    } else if (sortBy === "dueDate") {
      filteredData.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
    } else if (sortBy === "newest") {
      filteredData.sort((a, b) => b.createdDate - a.createdDate);
    }

    return filteredData;
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
