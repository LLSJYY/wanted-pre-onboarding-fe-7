import { useRef } from "react";

const TodoItem = ({item,modifyInputHandler,modfiyBySumbit ,deleteBtnHandler,onChangeCompleted,toggleModify,modifiedTodo,showModfiyInput,newTodo,modifyInputRef}) => {
  

  return (
    <li className="todoli" data-key={item.todo}>
      {toggleModify === item.id ?
        <>
          <input onChange={modifyInputHandler} value={newTodo} ref={modifyInputRef} />
          <button id="btn btn-submit" onClick={() => modfiyBySumbit(item)}>submit</button>
          <button id="btn btn-cancle" onClick={() => showModfiyInput(0)} >cancel</button>
        </>
        :
        <>
          <input id="isCompleted" type="checkbox" onChange={() => onChangeCompleted(item)}  checked={item.isCompleted}/><span id="content" >{item.todo}</span>
          <button className="btn delete" onClick={() => deleteBtnHandler(item.id)}>delete</button>
          <button className="btn modfiy" onClick={() => { modifiedTodo(item.todo); return showModfiyInput(item.id) }} >modify</button>
        </>
      }
    </li>)
};

export default TodoItem; 