import { useEffect, useState } from "react";
import axios from "axios";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
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

  const onAddTodo = (data) => {
    axios.post("https://pre-onboarding-selection-task.shop/todos", {
      "todo": data,
    }, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }
    }).then(function (res) {
      addTodoItem(res.data);
    }).catch(function (error) {
      console.warn(error, "error");
    })
  }
  const addTodoItem = (data) => {
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
        <TodoInput onAddTodo={onAddTodo}/>
        <TodoList todoStore={todoStore} setTodoStore={setTodoStore} deleteTodoItem={deleteTodoItem} modifyTodoItem={modifyTodoItem} onChangeChecked={onChangeChecked}></TodoList>
      </div>
    </>
  )
}
export default Todo;