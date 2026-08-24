import { useForm } from "react-hook-form";
import styles from "./NewTodo.module.css";
import { useTodos } from "../../hooks/useTodos";
import Input from "../UI/Input";

type FormInputs = {
  taskName: string;
  priority: string;
  dueDate: string;
};

export default function NewTodo() {
  const { addTodo } = useTodos();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>();

  const errorMessages = Object.values(errors);

  const onSubmit = (data: FormInputs) => {
    addTodo({
      text: data.taskName,
      priority: data.priority,
      dueDate: data.dueDate,
    });
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
        <div className={styles.inputBottomWrapper}>
          <select className={styles.todoPriority} {...register("priority")}>
            <option value="low">🟢</option>
            <option value="medium">🟠</option>
            <option value="high">🔴</option>
          </select>
          <Input
            type="date"
            className={styles.todoDate}
            {...register("dueDate", {
              required: "Date is required",
              validate: (value) =>
                !value ||
                value >= new Date().toISOString().slice(0, 10) ||
                "Data nie może być w przeszłości",
            })}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.btnAdd}
          >
            {isSubmitting ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
      {errorMessages && (
        <div className={styles.error}>
          <ul>
            {errorMessages.map((error) => (
              <li key={error.message}>{error.message}</li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}
