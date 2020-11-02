import React, { useState, useCallback } from "react";
import styles from "../App.module.css";
import ItemsList from "./ItemsList";

// useCallback если сравнивать с useMemo, то useCallback так же оборачиает колбэк, но он и его
//полностью возвращает. То есть эту функцию, а не результат того, что происходит в функции.
//useMemo возвращает результат функции

function App() {
  const [colored, setColored] = useState(false);
  const [count, setCount] = useState(1);

  const style = {
    color: colored ? "darkred" : "black",
  };

  const onIncrement = () => {
    setCount((prev) => prev + 1);
  };
  const onChange = () => {
    setColored((prev) => !prev);
  };

  const generateItemsFromAPI = useCallback(() => {
    return new Array(count).fill("").map((_, i) => `element ${i + 1}`);
    //создадим новый Array, длины count, с помощъю метода fill заполняем элементы, в нашем случае
    //пустыми строчками, с помощью map трансформируем этот массив в новый, где выводим его индексы,
    //если сам элемент нас не интересует, ставим _,
    //теперь нужно передать эту функцию как референс для другого компонента, где и будем его
    //использовать. Для этого создадим новый элемент ItemsList
    //мы вызываем эту функцию много лишних раз и это сильный удар по нашей производительности
    //для решения этой проблемы и используется хук useCallback,который делает то же самое,
    //что и хук useMemo, то есть он оборачивает какой-то колбэк, который необходимо закэшировать
    //первым параметром передает эту функцию, а вторым параметром список зависимостей
    //в нашем случае мы зависим от count
  }, [count]);
  return (
    <div>
      <h1 style={style}>Number of elements:{count}</h1>
      <button className={styles.addBtn} onClick={onIncrement}>
        Add
      </button>
      <button className={styles.defBtn} onClick={onChange}>
        Change
      </button>
      <ItemsList getItems={generateItemsFromAPI} />
    </div>
  );
}

export default App;
