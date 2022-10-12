import { useEffect, useState } from "react";
import axios from "axios";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import Button from "./Button/Button";
import './Todo.css'
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const navigate = useNavigate();
  const [todoStore, setTodoStore] = useState([]);
  const accessToken = localStorage.getItem('wtd_tk');

  useEffect(() => {
    if (!accessToken) { 
      navigate('/')
    }
  }, [accessToken]) // 왜 오류나는지 모르겟다.


  useEffect(() => {
    axios.get('https://pre-onboarding-selection-task.shop/todos',
      {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      }
    ).then((res) => {
      console.log(res)
      setTodoStore(res.data);
    }
    )
  }, []) // 왜 오류나는지 모르겟다.


  const appendTodoItem = (data) => {
    setTodoStore((prevData) => [
      ...prevData,
      {
        todo: data.todo,
        userId: data.userId,
        id: data.id,
        isCompleted: data.isCompleted,
      }
    ]);
  }
  const deleteTodoItem = (id) => {
    setTodoStore((prevData) => prevData.filter((el) => el.id !== id ));
  }

  const modifyTodoItem = (data) => {
    setTodoStore((prevData)=> [...prevData].forEach((todo)=> {if(todo.id === data.id) {
      todo.isCompleted = !todo.isCompleted
    }}))
  }
return (
  <>
    <div>
      <TodoInput appendTodoItem={appendTodoItem}></TodoInput>
      <TodoList todoList={todoStore} deleteTodoItem={deleteTodoItem}></TodoList>
      <Button></Button>
    </div>
  </>
)
}
export default Todo;