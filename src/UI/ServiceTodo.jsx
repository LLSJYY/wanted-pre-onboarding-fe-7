import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Main";
import "./ServiceTodo.css";
// import TodoReduxService from "../component/Todo/stateManage/redux/TodoReduxService";
import TodoRecoilService from "../component/Todo/stateManage/recoil/TodoRecoilService";

const ServiceTodo = () => {

  return (
    <div className="main">
        <BrowserRouter>
          <Routes>
            <Route path="/todos" element={<TodoRecoilService/>} />
            <Route path="/" element={<Main />} />
          </Routes>
        </BrowserRouter>
    </div>
  );

}

export default ServiceTodo;