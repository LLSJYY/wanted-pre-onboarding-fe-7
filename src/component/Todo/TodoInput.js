const TodoInput = (props) => {
  const inputHandler = (event) => {
    props.setEnteredData(event.target.value);
  }

  const onClick = (event) => {
    props.setTodoStore(props.enteredData)
  };

  return (
    <div className="inputbox">
      <input onChange={inputHandler} value={props.enteredData}/>
      <button onClick={onClick}>Add</button>
    </div>
  )
}
export default TodoInput;