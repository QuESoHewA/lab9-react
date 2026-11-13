import { memo } from "react";
import styles from "./Button.module.css";

function Button({ variant = "primary", className = "", type = "button", ...props }) {
  return <button type={type} className={`${styles.button} ${styles[variant]} ${className}`} {...props} />;
}

export default memo(Button);
