import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LoginInput } from "./LoginInput";

describe("LoginInput", () => {
  const registerMock = {
    onChange: jest.fn(),
    onBlur: jest.fn(),
    name: "test",
    ref: jest.fn(),
  };

  it("renders without crashing", () => {
    render(
      <LoginInput label="Test Label" id="testId" register={registerMock} />
    );
    expect(screen.getByLabelText("Test Label input")).toBeInTheDocument();
  });

  it("displays the error message when error prop is provided", () => {
    render(
      <LoginInput
        label="Test Label"
        id="testId"
        register={registerMock}
        error="Test error"
      />
    );
    expect(screen.getByText("Test error")).toBeInTheDocument();
  });

  it("applies the correct styles when error prop is provided", () => {
    render(
      <LoginInput
        label="Test Label"
        id="testId"
        register={registerMock}
        error="Test error"
      />
    );
    expect(screen.getByLabelText("Test Label input")).toHaveClass(
      "loginInput__invalidFeedback"
    );
  });
});
