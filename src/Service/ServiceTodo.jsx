import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ServiceLogin from "./ServiceLogin";
import "./ServiceTodo.css";
// import TodoReduxService from "../component/Todo/stateManage/redux/TodoReduxService";
import TodoRecoilService from "../component/Todo/stateManage/recoil/TodoRecoilService";

const ServiceTodo = () => {

  return (
    <div className="main">
        <BrowserRouter>
          <Routes>
            <Route path="/todos" element={<TodoRecoilService/>} />
            <Route path="/" element={<ServiceLogin />} />
          </Routes>
        </BrowserRouter>
    </div>
  );

}

export default ServiceTodo;