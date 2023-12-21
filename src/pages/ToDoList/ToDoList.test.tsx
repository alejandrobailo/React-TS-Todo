import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ToDoList } from "./ToDoList";

describe("ToDoList", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders without crashing", () => {
    render(<ToDoList />);
    expect(screen.getByText("No tasks found")).toBeInTheDocument();
  });

  it("adds a task when the AddTaskForm is submitted", () => {
    render(<ToDoList />);
    fireEvent.change(screen.getByLabelText("Add task input"), {
      target: { value: "Test task" },
    });
    fireEvent.click(screen.getByText("Add Task"));
    expect(screen.getByDisplayValue("Test task")).toBeInTheDocument();
  });

  it("updates a task when the Update button is clicked", () => {
    render(<ToDoList />);
    fireEvent.change(screen.getByLabelText("Add task input"), {
      target: { value: "Test task" },
    });
    fireEvent.click(screen.getByText("Add Task"));
    fireEvent.change(screen.getByLabelText("Task text input"), {
      target: { value: "Updated task" },
    });
    fireEvent.click(screen.getByLabelText("Update button"));
    expect(screen.getByDisplayValue("Updated task")).toBeInTheDocument();
  });

  it("removes a task when the Remove button is clicked", () => {
    render(<ToDoList />);
    fireEvent.change(screen.getByLabelText("Add task input"), {
      target: { value: "Test task" },
    });
    fireEvent.click(screen.getByText("Add Task"));
    fireEvent.click(screen.getByLabelText("Remove button"));
    expect(screen.queryByText("Test task")).not.toBeInTheDocument();
  });

  it("toggles a task done when the checkbox is clicked", () => {
    render(<ToDoList />);
    fireEvent.change(screen.getByLabelText("Add task input"), {
      target: { value: "Test task" },
    });
    fireEvent.click(screen.getByText("Add Task"));
    fireEvent.click(screen.getByLabelText("Mask as done checkbox"));
    expect(screen.getByText("1 tasks marked as done")).toBeInTheDocument();
  });
});
