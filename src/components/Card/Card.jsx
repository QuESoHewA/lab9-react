import { memo } from "react";
import styles from "./Card.module.css";

function Card({ as: Tag = "section", className = "", ...props }) {
  return <Tag className={`${styles.card} ${className}`} {...props} />;
}

export default memo(Card);
