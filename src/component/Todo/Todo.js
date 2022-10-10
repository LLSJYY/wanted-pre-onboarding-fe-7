
import { useState } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import Button from "./Button/Button";
import './Todo.css'
const Todo = () => {
  
  const [enteredData,setEnteredData] = useState('');
  const [todoStore,setTodoStore] = useState([]);

  const updataEnteredData = (data) => {
    setEnteredData(data);
  };

  const updateTodoStore = (data) => { 
    setTodoStore((prevData)=> ([...prevData,{
      data:data,
      id:Math.floor(Math.random()*1000).toString(),
    }])
    );
    setEnteredData('');
  }

  const updateDeleteData = (data) => {
    setTodoStore((prevData) => prevData.filter((item) => item.id !== data))
  }
  console.log(todoStore,enteredData);
  
  return (
    <>
      <div>
        <TodoInput setEnteredData={updataEnteredData} setTodoStore={updateTodoStore}  enteredData={enteredData}></TodoInput>
        <TodoList todoStore={todoStore} updateDeleteData={updateDeleteData}></TodoList>
        <Button></Button>
      </div>
     

    </>
  )
}
export default Todo;