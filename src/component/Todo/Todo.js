import { useEffect, useState } from "react";
import axios from "axios";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import './Todo.css'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { init, deleteTodo, modifyTodo,completedTodo } from "../../feature/todoRedux";
import store from '../../feature/todoStore';
import _ from 'lodash';
const Todo = () => {
  const storeRedux = store.getState().todo.list;
  const  todo2 = useSelector((state)=> state.todo.list);
  console.log(todo2);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const onDeleteTodo = (id) => {
    axios.delete(`https://pre-onboarding-selection-task.shop/todos/${id}`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      }
    },
    ).then((res) => {
      deleteTodoItem(id);

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
      modifyTodoItem(res.data);
    }).catch((res) => {
      console.warn(res);
    })
  }
  const modifyTodoItem = (data) => {
    setTodoStore(() => {
      const newStore = todoStore.map((el)=>({...el}));
      newStore.forEach((el)=>{
        if(el.id===data.id){
          el.todo = data.todo
        }
      })
      return newStore;
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
      onChangeChecked(res.data);
    }).catch((res) => {

    })
  }

  
  const onChangeChecked = (data) => {
    setTodoStore((prevData) =>{
      const newState = _.cloneDeep(prevData);
      newState.forEach(
        (item) => {
        if (item.id === data.id) {
          item.isCompleted = data.isCompleted;
        }
      })
      return newState;
    })
  }
  return (
    <>
      <div>
        <TodoInput onAddTodo={onAddTodo} />
        <TodoList
          todoStore={todoStore}
          setTodoStore={setTodoStore}
          onDeleteTodo={onDeleteTodo}
          modifyTodoItem={modifyTodoItem}
          onChangeChecked={onChangeChecked}
          onCompletedTodo={onCompletedTodo}
          onModifyTodo={onModifyTodo}
        ></TodoList>
      </div>
    </>
  )
}
export default Todo;