import axios from "axios";
import { useState,  useRef } from "react";

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
          <li className="todoli" data-key={item.todo} key={index}>
            { toggleModify === item.id ?
             <>
              <input onChange={modifyInputHandler}  value={newTodo} ref={modifyInputRef} />
              <button id="btn btn-submit" onClick={()=> modfiyBySumbit(item)}>submit</button>
              <button id="btn btn-cancle" onClick={()=> showModfiyInput(0)} >cancel</button>
             </>
             : 
            <>
            <input id="isCompleted" type="checkbox" onChange={()=> onChangeCompleted(item)} checked={item.isCompleted}/><span id="content" >{item.todo}</span>
            <button className="btn delete" onClick={() => deleteBtnHandler(item.id)}>delete</button>
            <button className="btn modfiy" onClick={() => {modifiedTodo(item.todo); return showModfiyInput(item.id)}} >modify</button>
            </>
            }
          </li>
        ))

        }
      </ul>}
    </>
  )
}
export default TodoList;