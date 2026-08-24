import styles from "./EmptyTodoList.module.css";

export default function EmptyTodoList() {
  return (
    <div className={styles.emptyState}>
      <span className={styles.icon}>🗒️</span>
      <p>Nothing here yet. Add your first task above.</p>
    </div>
  );
}
