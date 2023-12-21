import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { App } from "./App";

describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the Login component when the user is not logged in", () => {
    render(<App />);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("renders the ToDoList and Logout button when the user is logged in", () => {
    localStorage.setItem("token", "testToken");
    render(<App />);
    waitFor(() => {
      expect(screen.getByText("Logout")).toBeInTheDocument();
      expect(screen.getByText("ToDoList")).toBeInTheDocument();
    });
  });

  it("logs in the user when the Login button is clicked", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Login"));
    waitFor(() => {
      expect(screen.getByText("Logout")).toBeInTheDocument();
      expect(screen.getByText("ToDoList")).toBeInTheDocument();
    });
  });

  it("logs out the user when the Logout button is clicked", () => {
    localStorage.setItem("token", "testToken");
    render(<App />);
    fireEvent.click(screen.getByText("Logout"));
    expect(screen.getByText("Login")).toBeInTheDocument();
  });
});
