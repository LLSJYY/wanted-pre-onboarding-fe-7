import React from "react";

const UserPassword = (props) => {
  const passwordHandler = (event) => {
    props.setPassword(event.target.value); 
  };
    return (
      <input id="password" type="password" placeholder="password" onChange={passwordHandler} value={props.password}/>
    );
  }


export default UserPassword;