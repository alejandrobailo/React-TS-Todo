import styles from "./Pagination.module.css";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className={styles.pagination__container}>
      {[...Array(totalPages).keys()].map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`${styles.pagination__button} ${
            currentPage === number ? styles.active : ""
          }`}
        >
          {number + 1}
        </button>
      ))}
    </div>
  );
};
