import { useState } from "react";
import { Login } from "./pages/Login";
import { ToDoList } from "./pages/ToDoList";
import styles from "./App.module.css";

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tasks");
    setIsLoggedIn(false);
  };

  return (
    <div className={styles.app__container}>
      {isLoggedIn ? (
        <>
          <ToDoList />
          <button className={styles.app__button} onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
      <span className={styles.app__footerSpan}>Made with love ✌️</span>
    </div>
  );
};
