const UserPassword = (props) => {
  const passwordHandler = (event) => {
    props.setPassword(event.target.value); 
  };
    return (
 <input type="password" onChange={passwordHandler} value={props.password}/>
    );
  }


export default UserPassword;