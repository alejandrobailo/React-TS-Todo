import { UseFormRegisterReturn } from "react-hook-form";
import styles from "./LoginInput.module.css";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

interface LoginInputProps<T extends string> {
  label: string;
  id: string;
  type?: string;
  register: UseFormRegisterReturn<T>;
  error?: string;
}

export const LoginInput = <T extends string>({
  label,
  id,
  type = "text",
  register,
  error,
}: LoginInputProps<T>) => {
  return (
    <div className={styles.loginInput__formGroup}>
      <label htmlFor={id} className={styles.loginInput__label}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        {...register}
        className={`${styles.loginInput__input} ${
          error ? styles.loginInput__invalidFeedback : ""
        }`}
        aria-label={`${label} input`}
      />
      {error && <ErrorMessage message={error} />}
    </div>
  );
};
