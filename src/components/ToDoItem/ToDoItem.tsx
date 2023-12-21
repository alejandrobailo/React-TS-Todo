import { useRef } from "react";
import { Task } from "../../pages/ToDoList";
import styles from "./ToDoItem.module.css";

interface ToDoItemProps {
  task: Task;
  onUpdate: (id: number, title: string) => void;
  onRemove: (id: number) => void;
  onToggleDone: (id: number) => void;
}

export const ToDoItem = ({
  task,
  onUpdate,
  onRemove,
  onToggleDone,
}: ToDoItemProps) => {
  const titleRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.todoitem__container}>
      <input
        type="text"
        defaultValue={task.title}
        ref={titleRef}
        className={styles.todoitem__input}
        aria-label="Task text input"
      />
      <div className={styles.todoitem__block}>
        <button
          onClick={() => {
            if (titleRef.current) {
              onUpdate(task.id, titleRef.current.value);
            }
          }}
          className={styles.todoitem__button}
          aria-label="Update button"
        >
          Update
        </button>
        <button
          onClick={() => onRemove(task.id)}
          className={styles.todoitem__button}
          aria-label="Remove button"
        >
          Remove
        </button>
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggleDone(task.id)}
          className={styles.todoitem__checkbox}
          aria-label="Mask as done checkbox"
        />
      </div>
    </div>
  );
};
