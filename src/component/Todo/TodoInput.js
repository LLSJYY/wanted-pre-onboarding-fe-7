import { useRef } from "react";

const TodoInput = ({onAddTodo}) => {
  const inputRef = useRef('');
  const inputHandler = (e) => {
    inputRef.current.value = e.target.value;
  }
  const addTodo = () => {
    console.log(inputRef.current.value);
    onAddTodo(inputRef.current.value)
    inputRef.current.value = '';
  }



  return (
    <div className="inputbox">
      <input onChange={inputHandler} ref={inputRef} />
      <button onClick={addTodo}>Add</button>
    </div>
  )
}
export default TodoInput;