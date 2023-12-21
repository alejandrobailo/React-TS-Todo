import { useState } from "react";
import styles from "./AddTaskForm.module.css";
import commonStyles from "../../common.module.css";

interface AddTaskFormProps {
  onAdd: (title: string) => void;
}

export const AddTaskForm = ({ onAdd }: AddTaskFormProps) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.addTaskForm__form}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add new task"
        className={styles.addTaskForm__input}
        aria-label="Add task input"
      />
      <button type="submit" className={commonStyles.commonButton}>
        Add Task
      </button>
    </form>
  );
};
