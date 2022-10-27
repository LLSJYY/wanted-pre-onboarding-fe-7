import { useEffect} from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import './Todo.css'
import _ from 'lodash';

const Todo = ({todoStore,onDeleteTodo,onModifyTodo,onCompletedTodo,initTodo,onAddTodo} ) => {
  const todoStore_ = todoStore;
  const navigate = useNavigate();
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
      initTodo(res.data)
    })
  }, [])

  const onAddTodo_ = (data) => {
    axios.post("https://pre-onboarding-selection-task.shop/todos", {
      "todo": data,
    }, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }
    }).then(function (res) {
      onAddTodo(res.data);
    }).catch(function (error) {
      console.warn(error, "error");
    })
  }

  const onDeleteTodo_ = (id) => {
    axios.delete(`https://pre-onboarding-selection-task.shop/todos/${id}`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      }
    },
    ).then((res) => {
      onDeleteTodo(id)
    }).catch((res) => {
      console.warn(res);
    })
  };
  const onModifyTodo_ = ({ item, newTodo }) => {
    axios.put(`https://pre-onboarding-selection-task.shop/todos/${item.id}`, {
      todo: newTodo,
      isCompleted: false,
    }, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }
    },
    ).then((res) => {
      onModifyTodo(res.data);
    }).catch((res) => {
      console.warn(res);
    })
  }
  const onCompletedTodo_ = (item) => {
    axios.put(`https://pre-onboarding-selection-task.shop/todos/${item.id}`, {
      todo: item.todo,
      isCompleted: !item.isCompleted,
    }, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }
    },
    ).then((res) => {
      onCompletedTodo(res.data)
    }).catch((res) => {
    })
  }
  return (
    <>
      <div>
        <TodoInput onAddTodo={onAddTodo_} />
        <TodoList
          todoStore={todoStore_}
          onDeleteTodo={onDeleteTodo_}
          onCompletedTodo={onCompletedTodo_}
          onModifyTodo={onModifyTodo_}
        >
        </TodoList>
      </div>
    </>
  )
}
export default Todo;