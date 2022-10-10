import { useState,useRef } from "react";

const TodoList = (props) => {
  const [Modal,setmModal] = useState(false);
  const modifyHandler = () => {
    setmModal(true);
  }  

  return (
    <>
    <ul className="todoul">
      {props.todoStore.map((item,index) => (
        <li className="todoli"  data-key={item.id} key={index}><span id="content">{item.data}</span><button onClick={()=>props.updateDeleteData(item.id)} className="btn modify">delete</button><button onClick ={modifyHandler} className="btn delete">modify</button></li>
        ))

      }
    </ul>

    <div className="modal">
      <div className="modal-container">
        <div className="modal-inner">

        </div>
      </div>
    </div>
    </>
  )
}
export default TodoList;