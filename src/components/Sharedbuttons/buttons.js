import React from "react";
import styles from "./Buttons.module.css";

const Button = ({ type, value, onClick }) => {
  return (
    <>
      <input type={type || "button"} value={value} onClick={onClick} className={styles.Button}/>
    </>
  );
};

export default Button;