import React, { useState, useEffect } from "react";
// import State from "./examples/State";
// import Effect from "./examples/Effect";
// import Ref from "./examples/Ref";
// import Memo from "./examples/Memo";
// import Callback from "./examples/Callback";
import styles from "./App.module.css";
import Main from "./Main";
import Alert from "./alert/Alert";
import { AlertProvider } from "./alert/AlertCont";

//контекст
//с помощью крнтекста будем взаимодействовать с Alert, так как не нужно его показывать постоянно
//у нас будет при клике на кнопку выходить сообщение. Но кнопка находится в Main. Нам нужно связать
//кнопку с поведением компонента Alert.

//создаем контекст с помощью функции реакта createContext
// export const AlertContext = React.createContext(); перенесли в AlertCont

//==================Собственные хуки
// 1 - будет следить за переменной, за кот мы хотим

function useLogger(value) {
  // внутри используем те же реакт хуки, только вне реакт компонента
  // будем пользоваться useEffect, чтобы следить заизменениями value
  useEffect(() => {
    console.log("value changed :", value);
  }, [value]);
}
// 2- функция для инпутов
// этот код универсальный, то есть если мы хотим использовать другой инпут, то
// будем спредить lastNamt
const useInput = (initialValue) => {
  // создадим локальный стэйт, отталкиваясь от initialValue
  const [value, setValue] = useState(initialValue);
  const onChange = (event) => {
    setValue(event.target.value);
  };
  const clear = () => setValue("");
  return {
    bind: { value, onChange },
    value,
    clear,
  };
};

function App() {
  // ==========Собсьвенные хуки========================
  //много однотипного кода, чем больше инпутов, тем больше обработчиков
  // const [name, setName] = useState("");
  // const [lastName, setLastName] = useState("");

  // const handleChange = (event) => {
  //   setName(event.target.value);
  // };
  // const handleLastNameChange = (event) => {
  //   setLastName(event.target.value);
  // };
  const input = useInput("");
  const lastName = useInput("");
  useLogger(input.value);
  // =========================================================
  return (
    //все наше приложение оборачиваем в AlertContext
    //теперь нам в провайдер нужно передать это состояние с помощью свойства value
    <AlertProvider>
      {/* теперь все наше приложение обернуто в провайдер и все, что находится внутри
    имеет доступ к значениям этого провайдера */}
      <div className={styles.App}>
        <Alert />
        <Main />
        {/* <input type="text" value={name} onChange={handleChange} /> */}
        {/* <input type="text" value={lastName} onChange={handleLastNameChange} /> */}
        {/* <input type="text" value={input.value} onChange={input.onChange} />  */}
        <input type="text" {...input.bind} />
        <input type="text" {...lastName.bind} />
        <button
          type="reset"
          className={styles.arrfBtn}
          onClick={() => {
            input.clear();
            lastName.clear();
          }}
        >
          Clear
        </button>
        <hr />
        {/* <h1>{name}</h1> */}
        <h1>
          {input.value} {lastName.value}
        </h1>
      </div>
    </AlertProvider>
  );
}

export default App;
