import type { ComponentProps } from "react";
import styles from "./IconButton.module.css";

type IconButtonProps = ComponentProps<"button"> & {
  variant?: "default" | "danger";
};

export default function IconButton({
  variant = "default",
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={`${styles.iconButton} ${variant === "danger" ? styles.danger : ""} ${className ?? ""}`}
      {...props}
    />
  );
}
