import axios from "axios";
import { useRef } from "react";

const TodoInput = (props) => {
  const accessToken = localStorage.getItem('wtd_tk');
  const appendTodoItem = props.appendTodoItem;
  const inputRef = useRef('');

  const todoInputHandler = (e) => {
    inputRef.current.value = e.target.value;
  }


  const addTodo = () => { //중복된 값 확인해보고싶어요 ... get 방식..은안되겟지
    axios.post("https://pre-onboarding-selection-task.shop/todos", {
      "todo": inputRef.current.value,
    }, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }
    }).then(function (response) {
      console.log(response);
      appendTodoItem(response.data);
      inputRef.current.value = "";
    }).catch(function (error) {
      console.log(error, "error");
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