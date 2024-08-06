import React from "react";
import styles from "./Header.module.css";

const Header = ({ username }) => {
  return (
    <header className={styles.header}>
      <h1>Hi {username}</h1>
    </header>
  );
};

export default Header;
