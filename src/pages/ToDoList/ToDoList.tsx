import { useEffect, useState, useCallback } from "react";
import { AddTaskForm, Pagination, ToDoItem } from "../../components";
import styles from "./ToDoList.module.css";
import { usePagination } from "../../hooks/usePagination";

export type Task = {
  id: number;
  title: string;
  done: boolean;
  createdAt: number;
};

const getSavedTasks = (): Task[] => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
};

export const ToDoList = () => {
  const [tasks, setTasks] = useState<Task[]>(getSavedTasks);
  const tasksPerPage = 5;
  const sortedTasks = [...tasks].sort((a, b) => b.createdAt - a.createdAt);
  const tasksDone = tasks.filter((task) => task.done).length;
  const {
    currentPage,
    paginatedItems: paginatedTasks,
    onPageChange,
  } = usePagination(sortedTasks, tasksPerPage);

  const addTask = useCallback((title: string) => {
    if (!title.trim()) return false;

    const newTask = {
      id: Date.now(),
      title,
      done: false,
      createdAt: Date.now(),
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);

    return true;
  }, []);

  const updateTask = useCallback((id: number, title: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, title } : task))
    );
  }, []);

  const toggleTaskDone = useCallback((id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }, []);

  const removeTask = useCallback((id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className={styles.todolist__container}>
      <AddTaskForm onAdd={addTask} />
      {paginatedTasks.length ? (
        <>
          {paginatedTasks.map((task) => (
            <ToDoItem
              key={task.id}
              task={task}
              onUpdate={updateTask}
              onRemove={removeTask}
              onToggleDone={toggleTaskDone}
            />
          ))}
          <p>{tasksDone} tasks marked as done</p>
        </>
      ) : (
        <p>No tasks found</p>
      )}
      {tasks.length > tasksPerPage && (
        <Pagination
          totalPages={Math.ceil(tasks.length / tasksPerPage)}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};
