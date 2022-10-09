const UserId = (props) => {
  const idHandler = (event) => {
    props.setId(event.target.value); 
  };


  return (
  <input onChange = {idHandler} value={props.id}/>
  );
}

export default UserId;