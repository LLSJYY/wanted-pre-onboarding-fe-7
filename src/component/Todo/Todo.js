import { useEffect, useState } from "react";
import axios from "axios";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import './Todo.css'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { init, addTodo, deleteTodo, modifyTodo, completedTodo,undo,redo } from "../../feature/todoRedux";
import store from '../../feature/todoStore';
import UndoTodo from '../Todo/UndoTodo';
import _ from 'lodash';
const Todo = () => {
  const todo2 = useSelector((state) => state.todo.list);
  const previousTodo = store.getState().todo.previous;
  const futureTodo = store.getState().todo.future;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem('wtd_tk');
  const isDisableUndo = previousTodo.length < 1; 
  const isDisableredo = futureTodo.length < 1; 

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
      dispatch(init(res.data));
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
      dispatch(addTodo(res.data));
    }).catch(function (error) {
      console.warn(error, "error");
    })
  }

  const onDeleteTodo = (id) => {
    axios.delete(`https://pre-onboarding-selection-task.shop/todos/${id}`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      }
    },
    ).then((res) => {
        dispatch(deleteTodo(id))  ;
   }).catch((res) => {
      console.warn(res);
    })
  };

  const deleteTodoItem = (id) => {
    setTodoStore((prevData) => prevData.filter((el) => el.id !== id));
  }

  const onModifyTodo = ({ item, newTodo }) => {
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
      dispatch(modifyTodo(res.data));
    }).catch((res) => {
      console.warn(res);
    })
  }
  const onCompletedTodo = (item) => {
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
      dispatch(completedTodo(res.data));
    }).catch((res) => {
    })
  }
  const onClickUndo = () => {
    dispatch(undo());
  }
  const onClickRedo = () => {
    dispatch(redo());
  }
  return (
    <>
      <div>
        <TodoInput onAddTodo={onAddTodo} />
        <TodoList
          todoStore={store.getState().todo.list}
          onDeleteTodo={onDeleteTodo}
          onCompletedTodo={onCompletedTodo}
          onModifyTodo={onModifyTodo}
        ></TodoList>
      </div>
      <UndoTodo onClickUndo={onClickUndo} onClickRedo ={onClickRedo} isDisableUndo={isDisableUndo} isDisableredo={isDisableredo}/>
    </>
  )
}
export default Todo;