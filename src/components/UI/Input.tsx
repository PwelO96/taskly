import type { ComponentProps } from "react";
import styles from "./Input.module.css";

type InputProps = ComponentProps<"input">;

export default function Input({ className, ...props }: InputProps) {
  return (
    <input className={`${styles.input} ${className ?? ""}`} {...props}></input>
  );
}
