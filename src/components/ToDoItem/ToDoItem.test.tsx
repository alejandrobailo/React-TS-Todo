import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ToDoItem } from "./ToDoItem";

describe("ToDoItem", () => {
  const onUpdateMock = jest.fn();
  const onRemoveMock = jest.fn();
  const onToggleDoneMock = jest.fn();

  const task = {
    id: 1,
    title: "Test task",
    done: false,
    createdAt: 1,
  };

  it("renders without crashing", () => {
    render(
      <ToDoItem
        task={task}
        onUpdate={onUpdateMock}
        onRemove={onRemoveMock}
        onToggleDone={onToggleDoneMock}
      />
    );
    expect(screen.getByLabelText("Task text input")).toBeInTheDocument();
  });

  it("calls onUpdate with the correct id and title when the Update button is clicked", () => {
    render(
      <ToDoItem
        task={task}
        onUpdate={onUpdateMock}
        onRemove={onRemoveMock}
        onToggleDone={onToggleDoneMock}
      />
    );
    fireEvent.click(screen.getByLabelText("Update button"));
    expect(onUpdateMock).toHaveBeenCalledWith(task.id, task.title);
  });

  it("calls onRemove with the correct id when the Remove button is clicked", () => {
    render(
      <ToDoItem
        task={task}
        onUpdate={onUpdateMock}
        onRemove={onRemoveMock}
        onToggleDone={onToggleDoneMock}
      />
    );
    fireEvent.click(screen.getByLabelText("Remove button"));
    expect(onRemoveMock).toHaveBeenCalledWith(task.id);
  });

  it("calls onToggleDone with the correct id when the checkbox is clicked", () => {
    render(
      <ToDoItem
        task={task}
        onUpdate={onUpdateMock}
        onRemove={onRemoveMock}
        onToggleDone={onToggleDoneMock}
      />
    );
    fireEvent.click(screen.getByLabelText("Mask as done checkbox"));
    expect(onToggleDoneMock).toHaveBeenCalledWith(task.id);
  });
});
