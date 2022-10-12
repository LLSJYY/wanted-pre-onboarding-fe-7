const UserId = (props) => {
  const idHandler = (event) => {
    props.setId(event.target.value); 
  };


  return (
  <input id="" placeholder="id" onChange = {idHandler} value={props.id}/>
  );
}

export default UserId;