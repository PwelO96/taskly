import styles from "./TodoItem.module.css";
import Input from "../UI/Input";
import IconButton from "../UI/IconButton";

type TodoItemEditProps = {
  draftText: string;
  handleKeyDown: () => void;
  onEdit: () => void;
  onCancel: () => void;
  onDraftChange: (e: string) => void;
};

export default function TodoItemEdit({
  draftText,
  handleKeyDown,
  onEdit,
  onCancel,
  onDraftChange,
}: TodoItemEditProps) {
  <Input
    type="text"
    value={draftText}
    onChange={(e) => onDraftChange(e.target.value)}
    onKeyDown={handleKeyDown}
    autoFocus
  />;

  <div className={styles.todoActions}>
    <div>
      <IconButton title="Ok" onClick={onEdit}>
        ✔️
      </IconButton>
      <IconButton title="Cancel" onClick={onCancel}>
        ❌
      </IconButton>
    </div>
  </div>;
}
