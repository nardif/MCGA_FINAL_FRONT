import React from "react";
import styles from "./Inputs.module.css";

const Input = ({ label, type, register, required, errors, name }) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        {...register(name, { required })}
        className={styles.Input}
      />
      {errors && <span className={styles.inputError}>{errors.message}</span>}
    </div>
  );
};

export default Input;