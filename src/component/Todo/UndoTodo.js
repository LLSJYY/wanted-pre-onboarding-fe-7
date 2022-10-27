const UndoTodo = ({onClickUndo,onClickRedo,todoList}) => {
  const {previous,future} = todoList;
  const isDisableUndo = previous.length < 1; 
  const isDisableredo = future.length < 1; 

  return (
    <>
      <button onClick={onClickUndo} disabled={isDisableUndo}>undo</button>
      <button onClick={onClickRedo} disabled={isDisableredo}>redo</button>
    </>
  )
}

export default UndoTodo;