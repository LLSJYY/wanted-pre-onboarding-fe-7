import Todo from "./Todo"
import UndoTodo from "./UndoTodo";
import { init, addTodo, deleteTodo, modifyTodo, completedTodo,undo,redo } from "../../feature/todoRedux";
import { useDispatch, useSelector } from "react-redux";

const TodoService = () => {

  const todoStore = useSelector((state)=> state.todo);
  const dispatch = useDispatch();
  const todoList = {
    list: todoStore.list,
    previous: todoStore.previous,
    future: todoStore.future,
  }

  const initTodo = (id) => {
    return dispatch(init(id));
  }

  const onDeleteTodo = (id) => { 
    return dispatch(deleteTodo(id));
  }
  
  const onModifyTodo = (id) => { 
    return dispatch(modifyTodo(id));
  }
  const onCompletedTodo = (id) => { 
    return dispatch(completedTodo(id));
  }
  const onAddTodo = (id) => { 
    return dispatch(addTodo(id));
  }
  
  const onClickUndo = () => {
    dispatch(undo());
  }
  const onClickRedo = () => {
    dispatch(redo());
  } 
 
  return (
    <>
    <Todo todoStore={todoStore}
    initTodo={initTodo}
    onDeleteTodo={onDeleteTodo}
    onModifyTodo={onModifyTodo}
    onCompletedTodo={onCompletedTodo}
    onAddTodo={onAddTodo}
    />
    <UndoTodo 
    onClickUndo={onClickUndo} 
    onClickRedo ={onClickRedo} 
    todoList ={todoList}
    />
    </>
  )
}

export default TodoService;