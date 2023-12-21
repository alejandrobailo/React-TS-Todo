import styles from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <div className={styles.errorMessage__error}>{message}</div>;
};
