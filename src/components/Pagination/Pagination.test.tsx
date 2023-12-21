import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  const onPageChangeMock = jest.fn();

  it("renders without crashing", () => {
    render(
      <Pagination
        totalPages={5}
        currentPage={0}
        onPageChange={onPageChangeMock}
      />
    );
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("renders the correct number of pages", () => {
    render(
      <Pagination
        totalPages={5}
        currentPage={0}
        onPageChange={onPageChangeMock}
      />
    );
    expect(screen.getAllByRole("button")).toHaveLength(5);
  });

  it("calls onPageChange with the correct page when a button is clicked", () => {
    render(
      <Pagination
        totalPages={5}
        currentPage={0}
        onPageChange={onPageChangeMock}
      />
    );
    fireEvent.click(screen.getByText("3"));
    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });

  it("applies the active class to the current page", () => {
    render(
      <Pagination
        totalPages={5}
        currentPage={2}
        onPageChange={onPageChangeMock}
      />
    );
    expect(screen.getByText("3")).toHaveClass("active");
  });
});
