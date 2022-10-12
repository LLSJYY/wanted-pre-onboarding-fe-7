import axios from "axios";
import { useRef } from "react";

const TodoInput = (props) => {
  const accessToken = localStorage.getItem('wtd_tk');
  const appendTodoItem = props.appendTodoItem;
  const inputRef = useRef('');

  const todoInputHandler = (e) => {
    inputRef.current.value = e.target.value;
  }


  const addTodo = () => {
    axios.post("https://pre-onboarding-selection-task.shop/todos", {
      "todo": inputRef.current.value,
    }, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }
    }).then(function (response) {
      appendTodoItem(response.data);
      inputRef.current.value = "";
    }).catch(function (error) {
      console.warn(error, "error");
    })
  }


  return (
    <div className="inputbox">
      <input onChange={todoInputHandler} ref={inputRef} />
      <button onClick={addTodo}>Add</button>
    </div>
  )
}
export default TodoInput;