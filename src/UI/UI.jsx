import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Main";
import "./UI.css";
import TodoRecoilService from "../component/Todo/TodoRecoilService";
import TodoReduxService from "../component/Todo/TodoReduxService";
// import TodoService from '../component/Todo/TodoService';

const UI = () => {

  return (
    <div className="main">
        <BrowserRouter>
          <Routes>
            <Route path="/todos" element={<TodoReduxService/>} />
            <Route path="/" element={<Main />} />
          </Routes>
        </BrowserRouter>
    </div>
  );

}

export  default UI;