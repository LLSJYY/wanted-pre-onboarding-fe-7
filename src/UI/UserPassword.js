const UserPassword = (props) => {
  const passwordHandler = (event) => {
    props.setPassword(event.target.value); 
  };
    return (
 <input onChange={passwordHandler} value={props.password}/>
    );
  }


export default UserPassword;