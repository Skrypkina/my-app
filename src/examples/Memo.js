import React, { useState, useMemo, useEffect } from "react";
import styles from "../App.module.css";

function complexCompute(num) {
  //================= цикл искуственного торможения приложения
  let i = 0;
  while (i < 100000000) i++;
  // ===============
  //нам это нужно, чтобы понять, в какой момент мы можем оптимизировать приложение
  return num * 2;
} // эта функция вызывается, когда меняем состояние number, но и при клике на кнопку change
//тоже идет задержка - что можно оптимизировать. Для этого используется хук useMemo

// hooc useMemo

function Memo() {
  const [number, setNumber] = useState(42);
  const [colored, setColored] = useState(false);
  //у нас есть number и на основе этого значения нам необходимо вычислить новое значение, над
  //которым мы будем работать
  const computed = useMemo(() => {
    return complexCompute(number);
  }, [number]); //это значение можно закэшировать, т.е. если значение
  //number не изменилось, то не надо вызывать эту функцию. Оборачиваем это вычисление в useMemo
  //вторым парам передаем, от чего будут зависить вычисления
  //как только мы закэшировали с помощью useMemo наше вычисляемое свойство, то поведение изменилось
  const onIncrement = () => {
    setNumber((prev) => prev + 1);
  };
  const onDecrement = () => {
    setNumber((prev) => prev - 1);
  };

  const onChange = () => {
    setColored((prev) => !prev);
  };

  const style = useMemo(
    () => ({
      color: colored ? "darkred" : "black",
    }),
    [colored]
  ); //зависим от стэйта colored

  //есть другое применене хука, когда мы работаем с объектами
  //пусть мы при помощи useEffect хотим следить за объектом style
  useEffect(() => {
    console.log("styles.changed"); //видим консоль, даже когда стили не меняются, когда
    //нажимаем другие кнопки Add $ Remove. Лишний вызов, удар по производительности
    //почему это происходит? Когда меняем стэйт(number), мы вызываем рендер и создается новый
    //объект стилей. А useEffect смотрит за старым объектом, видит, что он изменился и вызывает
    //данный колбэк. Как раз можно использовать useMemo, кот сохранит этот объект на след рендер
  }, [style]);

  return (
    <div>
      <h1 style={style}>Enumerable property:{computed} </h1>
      <button className={styles.addBtn} onClick={onIncrement}>
        Add
      </button>
      <button className={styles.rmBtn} onClick={onDecrement}>
        Remove
      </button>
      <button className={styles.defBtn} onClick={onChange}>
        Change
      </button>
    </div>
  );
}

export default Memo;
