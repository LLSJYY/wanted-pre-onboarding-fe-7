import { useState,  useRef } from "react";
import TodoItem from "./TodoItem";

const TodoList = ({todoStore,onDeleteTodo,onModifyTodo,onCompletedTodo}) => {
  const [toggleModify, showModfiyInput] = useState(0);
  const [newTodo,modifiedTodo] = useState('');  
  let modifyInputRef = useRef('')

  const modifyInputHandler = (event) => {
    modifyInputRef.current.value = event.target.value; 
    modifiedTodo(event.target.value);
  };

  const modfiyBySumbit = (item) => {
    onModifyTodo({
      item,
      newTodo,
    });
    modifyInputRef.current.value="";
    showModfiyInput(0);
  }
  const deleteBtnHandler = (todoId) => {
    onDeleteTodo(todoId)
  };
  
  const onChangeCompleted = (item) => {
    onCompletedTodo(item);
  }

  return (
    <>
      {todoStore.length > 0 && <ul className="todoul">
        {todoStore.map((item, index) => (
          <TodoItem 
          key ={index}
          item={item}
          index={index}
          modifyInputHandler={modifyInputHandler}
          modfiyBySumbit={modfiyBySumbit}
          deleteBtnHandler={deleteBtnHandler}
          onChangeCompleted={onChangeCompleted}
          toggleModify={toggleModify}
          modifiedTodo={modifiedTodo}
          />
        ))

        }
      </ul>}
    </>
  )
}
export default TodoList;