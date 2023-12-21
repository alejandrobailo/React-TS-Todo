import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ErrorMessage } from "./ErrorMessage";

describe("ErrorMessage", () => {
  it("renders without crashing", () => {
    render(<ErrorMessage message="Test error message" />);
    expect(screen.getByText("Test error message")).toBeInTheDocument();
  });

  it("applies the correct styles", () => {
    render(<ErrorMessage message="Test error message" />);
    expect(screen.getByText("Test error message")).toHaveClass(
      "errorMessage__error"
    );
  });
});
