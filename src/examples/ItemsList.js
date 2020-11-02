import React, { useEffect, useState } from "react";

export default function ItemsList({ getItems }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const newItems = getItems();
    setItems(newItems);
    //проследим, сколько раз вызывается  useEffect
    console.log("render");
    //каждый раз render вызывается, когда добавляем, это норм, но если меняем цвет,
    //то render снова повторяется
  }, [getItems]);

  return (
    <ul>
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}
