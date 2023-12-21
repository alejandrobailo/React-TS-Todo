import { useEffect, useMemo, useState } from "react";
import { Task } from "../pages/ToDoList";

export const usePagination = (items: Task[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const newTotalPages = Math.ceil(items.length / itemsPerPage);

    if (currentPage >= newTotalPages) {
      // Jump to previous page if current page is no longer valid
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    }
  }, [items, currentPage, itemsPerPage]);

  const paginatedItems = useMemo(() => {
    return items.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    );
  }, [items, currentPage, itemsPerPage]);

  const onPageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  return {
    currentPage,
    paginatedItems,
    onPageChange,
  };
};
