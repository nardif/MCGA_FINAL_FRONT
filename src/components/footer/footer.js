import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.p_footer}>
        Final MCGA - UAI
      </p>
      <p className={styles.p_footer}>        
        Losada & Nardi
      </p>
    </footer>
  );
};

export default Footer;