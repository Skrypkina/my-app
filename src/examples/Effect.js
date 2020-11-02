import React, { useState, useEffect } from "react";
import styles from "../App.module.css";

// useEffect  служит для определенных сайдэффектов, мы можем за чем-то наблюдать и выполнять
//определенную логику
function Effect() {
  const [type, setType] = useState("users");
  const [data, setData] = useState([]);
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  });
  //хук useEffect принимает callback, он будет вызываться каждый раз, когда у нас происходит рендер
  //компонента
  // useEffect(() => {
  //   console.log("render");
  // });

  //есть случаи, когда вызывается useEffect и передается не только callback, но и 2 параметр,
  //где в массиве указываем от чего должен зависеть данный useEffect

  useEffect(() => {
    //этот колбэк нужно вызывать только в том случае, если state type у нас изменился
    console.log("type changed:", type);
    //например мы хотим загружать новый набор данных в зависимости от запроса
    fetch(`https://jsonplaceholder.typicode.com/${type}/`)
      .then((response) => response.json())
      .then((json) => setData(json));

    //данная очистка будет вызываться всегда, когда мы заново заходим в этот колбэк
    return () => {
      console.log("clean type");
    };
  }, [type]);

  const handleMousemove = (event) => {
    setPos({
      x: event.clientX,
      y: event.clientY,
    });
  };

  //можем эмулировать лайфсайкл хуки, например тот момент, когда компонент полностью зарендорился
  //и готов к работе
  //ComponentDidMount
  useEffect(() => {
    console.log("ComponentDidMount");
    //сюда добавляем слушатель
    window.addEventListener("mousemove", handleMousemove);
    //чтобы снять слушатель, возвращаем функцию, которая позволяет очищать слушатели тогда, когда
    //будет заканчиваться действие этого эффекта
    return () => {
      window.removeEventListener("mousemove", handleMousemove);
    };
  }, []);

  //показывать координаты мыши при любом движении мыши

  return (
    <div>
      <h1>Source: {type}</h1>
      <button onClick={() => setType("users")} className={styles.rmBtn}>
        Users
      </button>
      <button onClick={() => setType("todos")} className={styles.addBtn}>
        Todo
      </button>
      <button onClick={() => setType("posts")} className={styles.arrfBtn}>
        Posts
      </button>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <pre>{JSON.stringify(pos, null, 2)}</pre>
    </div>
  );
}

export default Effect;
