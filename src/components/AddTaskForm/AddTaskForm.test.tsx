import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import { AddTaskForm } from "./AddTaskForm";

describe("AddTaskForm", () => {
  it("renders correctly", () => {
    const { getByPlaceholderText, getByRole } = render(
      <AddTaskForm onAdd={() => {}} />
    );
    expect(getByPlaceholderText("Add new task")).toBeInTheDocument();
    expect(getByRole("button", { name: /Add Task/i })).toBeInTheDocument();
  });

  it("calls the onAdd prop when the form is submitted", () => {
    const onAdd = jest.fn();
    const { getByPlaceholderText, getByRole } = render(
      <AddTaskForm onAdd={onAdd} />
    );

    fireEvent.change(getByPlaceholderText("Add new task"), {
      target: { value: "New task" },
    });
    fireEvent.click(getByRole("button", { name: /Add Task/i }));

    expect(onAdd).toHaveBeenCalledWith("New task");
  });

  it("clears the input field when the form is submitted", () => {
    const onAdd = jest.fn();
    const { getByPlaceholderText, getByRole } = render(
      <AddTaskForm onAdd={onAdd} />
    );

    fireEvent.change(getByPlaceholderText("Add new task"), {
      target: { value: "New task" },
    });
    fireEvent.click(getByRole("button", { name: /Add Task/i }));

    expect(getByPlaceholderText("Add new task")).toHaveValue("");
  });
});
