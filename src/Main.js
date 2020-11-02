import React from "react";
import { useAlert } from "./alert/AlertCont";
import styles from "./App.module.css";
// import { useAlertToggle } from "./alert/AlertCont";

export default function Main() {
  //   const toggle = useAlertToggle();
  //   const { toggle } = useAlert();
  const { show } = useAlert();
  return (
    <>
      <h1>Hello for context component</h1>
      <button
        className={styles.addBtn}
        onClick={() => show("text from Main.js")}
      >
        Show alert
      </button>
    </>
  );
}
