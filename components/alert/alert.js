import styles from "./alert.module.css";

import cn from "classnames";

export default function Alert({ children, type }) {
  return (
    <div
      // classnamesによって複数のCSSクラスの指定が楽になります
      className={cn({
        [styles.success]: type === "success", //success: true/false
        [styles.error]: type === "error", //error: true/false
      })}
    >
      {children}
    </div>
  );
}
