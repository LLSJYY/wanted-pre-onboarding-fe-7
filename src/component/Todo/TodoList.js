import axios from "axios";
import { useState,  useRef } from "react";

const TodoList = (props) => {
  const [modify, setModify] = useState(0);
  const [newTodo,modifyTodo] = useState('');
  let modifyInputRef = useRef('')
  const todoStore = props.todoStore;
  const deleteTodoItem = props.deleteTodoItem;
  const modifyTodoItem = props.modifyTodoItem;
  const accessToken = localStorage.getItem('wtd_tk');

  const deleteBtnHandler = (id) => {
    axios.delete(`https://pre-onboarding-selection-task.shop/todos/${id}`,{
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      }
    },
    ).then((res)=> {
      deleteTodoItem(id);
    }).catch((res)=>{
      console.warn(res);
    })
  };

  const modifyInputHandler = (event) => {
    modifyInputRef.current.value = event.target.value; 
    modifyTodo(event.target.value);
  };

  const modfiyBySumbitBtn = (item) => {
    const newTodoText = modifyInputRef.current.value;
    axios.put(`https://pre-onboarding-selection-task.shop/todos/${item.id}`,{
      todo:newTodoText,
      isCompleted: false,
    },{
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }
    },
    ).then((res)=> {
      modifyTodoItem(res.data);
      setModify(0);  
    }).catch((res)=>{
      console.warn(res);

    })
  }
  const onChangeCompleted = (item) => {
    axios.put(`https://pre-onboarding-selection-task.shop/todos/${item.id}`,{
      todo:item.todo,
      isCompleted: !item.isCompleted,
    },{
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }
    },
    ).then((res)=> {
      props.onChangeChecked(res.data);
      }).catch((res)=>{

    })
  }
  return (
    <>
      {todoStore.length > 0 && <ul className="todoul">
        {todoStore.map((item, index) => (
          <li className="todoli" data-key={item.todo} key={index}>
            { modify === item.id ?
             <>
              <input onChange={modifyInputHandler}  value={newTodo} ref={modifyInputRef} />
              <button id="btn btn-submit" onClick={()=> modfiyBySumbitBtn(item)}>submit</button>
              <button id="btn btn-cancle" onClick={()=> setModify(0)} >cancel</button>
             </>
             : 
            <>
            <input id="isCompleted" type="checkbox" onChange={()=> onChangeCompleted(item)} checked={item.isCompleted}/><span id="content" >{item.todo}</span>
            <button className="btn delete" onClick={() => deleteBtnHandler(item.id)}>delete</button>
            <button className="btn modfiy" onClick={() => {modifyTodo(item.todo); return setModify(item.id)}} >modify</button>
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