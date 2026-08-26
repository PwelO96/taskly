import styles from "./TodoItem.module.css";
import Input from "../UI/Input";
import IconButton from "../UI/IconButton";

type TodoItemEditProps = {
  draftText: string;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onEditApprove: () => void;
  onCancel: () => void;
  onDraftChange: (e: string) => void;
};

export default function TodoItemEdit({
  draftText,
  handleKeyDown,
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
        onKeyDown={handleKeyDown}
        autoFocus
      />
      <div className={styles.todoActions}>
        <div>
          <IconButton title="Ok" onClick={onEditApprove}>
            ✔️
          </IconButton>
          <IconButton title="Cancel" onClick={onCancel}>
            ❌
          </IconButton>
        </div>
      </div>
    </>
  );
}
