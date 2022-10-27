import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Main";
import Todo from '../component/Todo/Todo';
import TodoService from '../component/Todo/TodoService';
import "./UI.css";
import { Provider} from 'react-redux'
import todoStore from "../feature/todoStore";
const UI = () => {

  return (
    <div className="main">
      <Provider store={todoStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/todos" element={<TodoService />} />
            <Route path="/" element={<Main />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );

}

export default UI;