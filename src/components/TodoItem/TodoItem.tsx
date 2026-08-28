import { useTodos } from "../../hooks/useTodos";
import styles from "./TodoItem.module.css";
import type { Todo } from "../../types/todo";
import { useState } from "react";
import TodoItemEdit from "./TodoItemEdit";
import TodoItemView from "./TodoItemView";

type TodoItemProps = {
  todo: Todo;
  onRequestDelete: () => void;
};

export default function TodoItem({ todo, onRequestDelete }: TodoItemProps) {
  const { toggleTodo, editTodo } = useTodos();
  const [draft, setDraft] = useState<string | null>(null);

  const startEdit = () => setDraft(todo.text);

  const taskCancelEdit = () => setDraft(null);

  const taskApproveEdit = () => {
    const trimmed = draft?.trim();
    if (!trimmed) return;
    editTodo(todo.id, trimmed);
    setDraft(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      taskApproveEdit();
    }
    if (e.key === "Escape") taskCancelEdit();
  };

  return (
    <li className={styles.todoItem}>
      {draft !== null ? (
        <TodoItemEdit
          draftText={draft}
          onKeyDown={handleKeyDown}
          onEditApprove={taskApproveEdit}
          onCancel={taskCancelEdit}
          onDraftChange={setDraft}
        />
      ) : (
        <TodoItemView
          todo={todo}
          onEdit={startEdit}
          onDelete={onRequestDelete}
          onToggle={() => toggleTodo(todo.id, !todo.is_checked)}
        />
      )}
    </li>
  );
}
