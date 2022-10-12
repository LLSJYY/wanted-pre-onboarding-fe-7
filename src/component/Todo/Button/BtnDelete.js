import axios from "axios";

const BtnDelete = (props) => {
  const accessToken = localStorage.getItem('wtd_tk');
  const deleteTodoItem = props.deleteTodoItem;
  const todoItemId = props.todoItemId;
  console.log(todoItemId);
  const deleteBtnHandler = (id) => {
    axios.delete(`https://pre-onboarding-selection-task.shop/todos/${id}`,
      {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      }
    ).then((res) => {
      console.log(res);
    }
    )
  }
  return (
    <button onClick={()=> deleteBtnHandler(todoItemId)}>❌</button>
  )
}
export default BtnDelete;