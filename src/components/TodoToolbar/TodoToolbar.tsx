import Input from "../UI/Input";
import styles from "./TodoToolbar.module.css";

export default function TodoToolbar() {
  return (
    <div className={styles.todoToolbar}>
      <Input type="search" placeholder="Search task..." />
      <select className={styles.todoSort}>
        <option>Newest</option>
        <option>Priority</option>
        <option>Deadline</option>
      </select>
    </div>
  );
}
