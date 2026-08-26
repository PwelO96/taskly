import { useTodos } from "../../hooks/useTodos";
import styles from "./TodoItem.module.css";
import type { Todo } from "../../types/todo";
import { useState } from "react";
import TodoItemEdit from "./TodoItemEdit";
import TodoItemsView from "./TodoItemView";

type TodoItemProps = {
  todo: Todo;
  onRequestDelete: () => void;
};

export default function TodoItem({ todo, onRequestDelete }: TodoItemProps) {
  const { toggleTodo, editTodo } = useTodos();
  const [taskEdit, setTaskEdit] = useState(false);
  const [draftText, setDraftText] = useState(todo.text);

  const startEdit = () => {
    setDraftText(todo.text);
    setTaskEdit(true);
  };

  const taskCancelEdit = () => {
    setDraftText(todo.text);
    setTaskEdit(false);
  };

  const taskApproveEdit = () => {
    const trimmed = draftText.trim();
    if (!trimmed) return;
    editTodo(todo.id, trimmed);
    setTaskEdit(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      taskApproveEdit();
    }
    if (e.key === "Escape") taskCancelEdit();
  };

  return (
    <li className={styles.todoItem}>
      {taskEdit ? (
        <TodoItemEdit
          draftText={draftText}
          handleKeyDown={handleKeyDown}
          onEditApprove={taskApproveEdit}
          onCancel={taskCancelEdit}
          onDraftChange={setDraftText}
        />
      ) : (
        <TodoItemsView
          todo={todo}
          onEdit={startEdit}
          onDelete={onRequestDelete}
          onToggle={() => toggleTodo(todo.id)}
        />
      )}
    </li>
  );
}
