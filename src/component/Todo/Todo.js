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
  }, [accessToken])

  useEffect(() => {
    axios.get('https://pre-onboarding-selection-task.shop/todos',
      {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      }
    ).then((res) => {
      setTodoStore(res.data);
    }
    )
  }, [])

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
    setTodoStore((prevData) => prevData.filter((el) => el.id !== id));
  }

  const modifyTodoItem = (data) => {
    setTodoStore((prevData) => {
      [...prevData].forEach(
        (item) => {
          if (item.id === data.id) {
            item.todo = data.todo;
          }
        })
      return [...prevData];
    }
    )
  }

  const onChangeChecked = (data) => {
    setTodoStore((prevData) => {
      [...prevData].forEach(
        (item) => {
          if (item.id === data.id) {
            item.isCompleted = data.isCompleted;
          }
        })
      return [...prevData];
    } 
    )
  }
  return (
    <>
      <div>
        <TodoInput appendTodoItem={appendTodoItem}></TodoInput>
        <TodoList todoStore={todoStore} setTodoStore={setTodoStore} deleteTodoItem={deleteTodoItem} modifyTodoItem={modifyTodoItem} onChangeChecked={onChangeChecked}></TodoList>
        <Button></Button>
      </div>
    </>
  )
}
export default Todo;