const UndoTodo = ({onClickUndo,onClickRedo,isDisableUndo,isDisableredo}) => {
  return (
    <>
      <button onClick={onClickUndo} disabled={isDisableUndo}>undo</button>
      <button onClick={onClickRedo} disabled={isDisableredo}>redo</button>
    </>
  )
}

export default UndoTodo;