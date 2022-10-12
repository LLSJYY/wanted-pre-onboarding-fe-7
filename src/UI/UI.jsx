import React from "react";
import { BrowserRouter, Route ,Routes} from "react-router-dom";
import Main from "./Main";
import Todo from '../component/Todo/Todo'
import "./UI.css"

const UI = () => {

  return (
    <div className="main">
      <BrowserRouter>
        <Routes>
          <Route path="/todos" element={<Todo />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default UI;