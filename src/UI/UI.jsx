import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Main";
import "./UI.css";
import { Provider} from 'react-redux'
import todoStore from "../feature/todoStore";
import {RecoilRoot} from 'recoil';
import TodoRecoilService from "../component/Todo/TodoRecoilService";
// import TodoService from '../component/Todo/TodoService';

const UI = () => {

  return (
    <div className="main">
      <RecoilRoot>
      <Provider store={todoStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/todos" element={<TodoRecoilService />} />
            <Route path="/" element={<Main />} />
          </Routes>
        </BrowserRouter>
      </Provider>
      </RecoilRoot>
    </div>
  );

}

export  default UI;