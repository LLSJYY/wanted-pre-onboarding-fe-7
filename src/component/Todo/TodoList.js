import axios from "axios";
import { useState, useEffect,useRef } from "react";

const TodoList = (props) => {
  const [modify, setModify] = useState(0);
  let modifyInputRef = useRef('')
  const todoList = props.todoList;
  const deleteTodoItem = props.deleteTodoItem;
  const accessToken = localStorage.getItem('wtd_tk');
  console.log()
  const deleteBtnHandler = (id) => {
    axios.delete(`https://pre-onboarding-selection-task.shop/todos/${id}`,{
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      }
    },
    ).then((res)=> {
      deleteTodoItem(id);
    }).catch((res)=>{
      console.log(res);
    })
  };

  const modifyInputHandler = (event) => {
    modifyInputRef.current.value = event.target.value; 
    console.log(event);
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
      setModify(0);
    }).catch((res)=>{
    })
  }

  return (
    <>
      {todoList.length > 0 && <ul className="todoul">
        {todoList.map((item, index) => (
          <li className="todoli" data-key={item.todo} key={index}>
            { modify === item.id ?
             <>
              <input onChange={modifyInputHandler}  ref={modifyInputRef} />
              <button id="btn btn-submit" onClick={()=> modfiyBySumbitBtn(item)}>submit</button>
              <button id="btn btn-cancle" onClick={()=> setModify(0)} >cancel</button>
             </>
             : 
            <>
            <span id="content" >{item.todo}</span>
            <button className="btn delete" onClick={() => deleteBtnHandler(item.id)}>delete</button>
            <button className="btn modfiy" onClick={() => setModify(item.id)} >modify</button>
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