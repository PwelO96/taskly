import styles from "./Header.module.css";

type HeaderProps = {
  text: string;
};

export default function Header({ text }: HeaderProps) {
  return <h1 className={styles.headerTitle}>{text}</h1>;
}
