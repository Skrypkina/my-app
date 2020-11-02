import React from "react";
import { useAlert } from "./AlertCont";
import styles from "../App.module.css";

const Alert = () => {
  //для того, чтобы получить состояние Alert мы вызываем хук useContext()
  //   const alert = useContext(AlertContext);
  //а в алерте просто вызовем функцию useAlert
  const alert = useAlert();

  if (!alert.visible) return null;
  //если через useAlert, то в самом алерте есть доступ к toggle
  return (
    <div className={styles.active} onClick={alert.hide}>
      {/* Very importand ennouncment */}
      {alert.text}
    </div>
  );
};

export default Alert;
