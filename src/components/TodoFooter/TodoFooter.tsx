import { useTodos } from "../../hooks/useTodos";
import styles from "./TodoFooter.module.css";

type FooterProps = {
  text: string;
};

export default function TodoFooter({ text }: FooterProps) {
  const { todos } = useTodos();

  const remainingTodos = todos.filter((todo) => !todo.isChecked).length;

  return (
    <p className={styles.todoFooter}>
      {text}
      <span className={styles.leftNumber}>{remainingTodos}</span>
    </p>
  );
}
