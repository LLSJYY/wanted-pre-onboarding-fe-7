import { useState, useRef } from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todoStore, onDeleteTodo, onModifyTodo, onCompletedTodo }) => {
  
  let modifyInputRef = useRef('')
  const todoStore_ = todoStore.list;
  const [toggleModify, showModfiyInput] = useState(0);
  const [newTodo, modifiedTodo] = useState('');

  const modifyInputHandler = (event) => {
    modifyInputRef.current.value = event.target.value;
    modifiedTodo(event.target.value);
    console.log()
  };

  const modfiyBySumbit = (item) => {
    onModifyTodo({
      item,
      newTodo,
    });
    modifyInputRef.current.value = "";
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
      {
        todoStore_.length > 0 && <ul className="todoul">
          {
            todoStore_.map((item, index) => (
              <TodoItem
                item={item}
                key={index}
                modifyInputHandler={modifyInputHandler}
                modfiyBySumbit={modfiyBySumbit}
                deleteBtnHandler={deleteBtnHandler}
                onChangeCompleted={onChangeCompleted}
                toggleModify={toggleModify}
                modifiedTodo={modifiedTodo}
                showModfiyInput={showModfiyInput}
                newTodo={newTodo}
                modifyInputRef={modifyInputRef}
              />
            ))
          }
        </ul>}
    </>
  )
}
export default TodoList;