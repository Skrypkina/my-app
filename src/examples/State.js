import React, { useState } from "react";

import styles from "../App.module.css";

// useState(initialState)возвращает массив где 1эл-стэйт, 2эл - функция setState
//всегда наверху функц.компонента, нельзя вызывать функцию useState в блоке if
//это асинхронный хук

//начальное состояние можно вычислять
const computedInitialState = () => Math.trunc(Math.random() * 20);
//но эта функция будет вызываться
//при каждом рендере при изменении и это тормозит приложение
//для того, чтобы вызвать эту функцию 1 раз в хук useState можно передать кол бэк функцию, кот
//вызовет эту функцию 1 раз

function State() {
  // const [counter, setCounter] = useState(0);
  // const [counter, setCounter] = useState(computedInitialState());
  const [counter, setCounter] = useState(() => {
    return computedInitialState();
  });

  // state with objects
  const [state, setState] = useState({
    title: "counter",
    date: Date.now(),
  });

  const [array, setArray] = useState(["Ayax"]);

  const increment = () => {
    // setCounter(counter + 1);
    //но нам нужно от предыдущего состояния
    setCounter((prev) => prev + 1);
  };

  const decrement = () => {
    setCounter((prev) => prev - 1);
  };

  const rename = () => {
    setState((prev) => {
      return {
        ...prev,
        title: "new title",
      };
    });
  };

  const addName = () => {
    setArray((prev) => {
      return [...prev, "Mango"];
    });
  };
  return (
    <div>
      <h1>Counter : {counter}</h1>
      <buttom className={styles.rmBtn} onClick={decrement}>
        Remove
      </buttom>
      <buttom className={styles.addBtn} onClick={increment}>
        Add
      </buttom>
      <buttom className={styles.defBtn} onClick={rename}>
        Change
      </buttom>
      <buttom className={styles.arrfBtn} onClick={addName}>
        Change Array
      </buttom>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <pre>{JSON.stringify(array)}</pre>
    </div>
  );
}

export default State;
