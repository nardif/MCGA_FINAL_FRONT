import React from "react";
import styles from "./Modals.module.css";


const LoginButton = ({ isOpen, handleClose, children, title }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.Overlay}>
        <div className={styles.Modal}>
        <div>
            <h2>{title}</h2>
            <button onClick={handleClose} className={styles.close}>X</button>
        </div>
        {children}
    </div>
    </div>
  );
};

export default LoginButton;