import React, { useState, useContext, useReducer } from "react";
// в этом же файле еще один хук useReduser

//создаем контекст с помощью функции реакта createContext
const AlertContext = React.createContext();
// const AlertToggleContext = React.createContext();

//для того, чтобы не экспортировать AlertContext, можно создать функцию, кот будет возвращать
//результат работы будет возвращать useContext, но будет обращаться к приватной для эьтого
//модуля переменной AlertContext

// reducer это функция, чистая, кот первым параметром принимает стэйт, и вторым парам
//принимает экшин

const reducer = (state, action) => {
  switch (action.type) {
    case "show":
      return { ...state, visible: true, text: action.text };
    case "hide":
      console.log("hide");
      return { ...state, visible: false };
    default:
      return state;
  }
};
export const useAlert = () => {
  return useContext(AlertContext);
};

// export const useAlertToggle = () => {
//   return useContext(AlertToggleContext);
// };

//чтобы можно было оборачивать в провайдер любой кусок приложения
export const AlertProvider = ({ children }) => {
  //можно стэйт и функцию писать здесь
  //   const [alert, setAlert] = useState(false);
  //   const toggle = () => setAlert((prev) => !prev);
  // перепишем логику алерта на использовании useReducer
  //   этот хук первым параметром принимает в себя сам редьюсер и начальное состояние
  //стэйта- объект
  const [state, dispatch] = useReducer(reducer, {
    visible: false,
    text: "",
  });

  // так как нет функции toggle, сформируем 2 функции, кот позволят работать со стэйтом
  // для изменения стэйта пользуемся функцией dispatch
  const show = (text) => dispatch({ type: "show", text });
  const hide = () => dispatch({ type: "hide" });
  return (
    <AlertContext.Provider
      value={{
        // visible: alert,
        visible: state.visible,
        // toggle,
        show,
        hide,
        text: state.text,
      }}
      //   если много экспортируемых элементов, то можно пользоваться объектом
    >
      {/* <AlertToggleContext.Provider value={toggle}> */}
      {/* теперь в этих компонентах внутри мы можем обратиться к состоянию alert */}
      {/* так как нужно еще и функцию toggle экспортировать, то есть когда мы экспортируем 
      в value не какое-то значение, а объект  */}

      {children}
      {/* </AlertToggleContext.Provider> */}
    </AlertContext.Provider>
  );
};

//есть компонент AlertProvider, кот не несет в себе никакого шаблона, и у нас
//есть место, где можно описывать изолированную логику относительно алерта
