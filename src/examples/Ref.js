import React, { useState, useEffect, useRef } from "react";
// import State from "./examples/State";
// import Effect from "./examples/Effect";
import styles from "../App.module.css";

// let renderCount = 1; // не очень хороший подход, так как у нас переменная вне компонента и это
//не совсем правильно
// лучше воспользоваться хуком useRef, кот по своей сути так же создает состояние
//очень похож на useState, но есть отличия

//useRef  похож на то, как мы работаем со стэйтом
function Ref() {
  //есть задача посчитать, сколько раз мы рендорили компонент
  //как можно сделать без хука useRef
  // const [renderCount, setRenderCount] = useState(1);

  //создадим новый стейт
  const [value, setValue] = useState("initial");
  // useRef
  const renderCount = useRef(1); //это не значение, а это объект, у кот есть свойство current
  //состояния, кот мы определяем через хук useRef сохраняются м/у рендорами компонента
  //но при этом, когда мы меняем его, то не вызываем рендер компонента
  //то есть, если мы хотим сохранить что-то между рендорами, то исп useRef- то если не хотим пере
  //ресовывать. Если хотим перересовывать, то пользуемся useState
  //хук useEffect без второго параметра вызывается каждый раз, когда происходит рендер

  //useRef можно получать ссылки на ДОМ элементы
  const inputRef = useRef(null);
  // ref используется, когда хотим получать значения предыдущего стэйта
  //например, значения пред value, что было до рендора
  const prevValue = useRef("");
  //обращаемся к useEffect и говорим, как только у нас меняется значение value, за ним следим
  //мы хотим изменить предыдущее состояние
  useEffect(() => {
    prevValue.current = value;
  }, [value]);
  useEffect(() => {
    // setRenderCount((prev) => prev + 1); //попадаем в useEffect, говорим, что стейт нужно перерендорить
    //снова попадаем в useEffect и так до бесконечности
    // под данную задачу такой подход не годится
    // в таклм случае стэйт не нужен, коментим его и добавляем
    renderCount.current++;
    console.log(inputRef.current.value); //находится обычный ДОМ элем инпута
  });

  //ref часто используется, чтобы задавать фокусы на элементы

  const onFocus = () => inputRef.current.focus();
  const handleValue = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <h1>Renders: {renderCount.current}</h1>
      {/* здесь мы войдем в бесконечный луп */}
      <h2>Prev Value: {prevValue.current}</h2>
      {/* видим пред состояние */}
      {/* атрибутом ref привязываем inputRef к инпуту */}
      <input ref={inputRef} type="text" onChange={handleValue} value={value} />
      <button className={styles.addBtn} onClick={onFocus}>
        Focus
      </button>
    </div>
  );
}

export default Ref;
