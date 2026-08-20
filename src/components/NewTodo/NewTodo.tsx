import { useForm } from "react-hook-form";
import styles from "./NewTodo.module.css";
import { useTodos } from "../../hooks/useTodos";
import Input from "../UI/Input";

type FormInputs = {
  taskName: string;
};

export default function NewTodo() {
  const { addTodo } = useTodos();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>();

  const onSubmit = (data: FormInputs) => {
    addTodo(data.taskName);
    reset();
  };

  return (
    <form className={styles.todoForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputWrapper}>
        <Input
          type="text"
          placeholder="Type new task..."
          className={styles.todoInput}
          {...register("taskName", {
            required: "Task name is required",
            minLength: {
              value: 3,
              message: "Task must be at least 3 characters length.",
            },
          })}
        />
        <select className={styles.todoPriority}>
          <option value="3">🔴</option>
          <option value="2">🟠</option>
          <option value="1">🟢</option>
        </select>
        <button type="submit" disabled={isSubmitting} className={styles.btnAdd}>
          {isSubmitting ? "Adding..." : "Add"}
        </button>
      </div>
      {errors.taskName && (
        <div className={styles.error}>{errors.taskName.message}</div>
      )}
    </form>
  );
}
