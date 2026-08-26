import styles from "./TodoItem.module.css";
import Input from "../UI/Input";
import IconButton from "../UI/IconButton";

type TodoItemEditProps = {
  draftText: string;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onEditApprove: () => void;
  onCancel: () => void;
  onDraftChange: (value: string) => void;
};

export default function TodoItemEdit({
  draftText,
  onKeyDown,
  onEditApprove,
  onCancel,
  onDraftChange,
}: TodoItemEditProps) {
  return (
    <>
      <Input
        type="text"
        value={draftText}
        onChange={(e) => onDraftChange(e.target.value)}
        onKeyDown={onKeyDown}
        aria-label="Edit task"
        autoFocus
      />
      <div className={styles.todoActions}>
        <IconButton title="Ok" onClick={onEditApprove}>
          ✔️
        </IconButton>
        <IconButton title="Cancel" onClick={onCancel}>
          ❌
        </IconButton>
      </div>
    </>
  );
}
