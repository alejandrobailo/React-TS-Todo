import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Login } from ".";

describe("Login", () => {
  const onLoginMock = jest.fn();

  it("renders without crashing", () => {
    render(<Login onLogin={onLoginMock} />);
    expect(screen.getByText("Login to your account")).toBeInTheDocument();
  });

  it("calls onLogin when the form is submitted", async () => {
    render(<Login onLogin={onLoginMock} />);
    fireEvent.click(screen.getByText("Login"));
    waitFor(() => expect(onLoginMock).toHaveBeenCalled());
  });

  it("displays loading state while processing", async () => {
    render(<Login onLogin={onLoginMock} />);
    fireEvent.click(screen.getByText("Login"));
    waitFor(() => expect(screen.getByText("Loading...")).toBeInTheDocument());
  });

  it("stores token in local storage on successful login", async () => {
    render(<Login onLogin={onLoginMock} />);
    fireEvent.click(screen.getByText("Login"));
    waitFor(() => expect(localStorage.getItem("token")).toBeTruthy());
  });
});
