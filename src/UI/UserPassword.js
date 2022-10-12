import React from "react";

const UserPassword = (props) => {
  const passwordHandler = (event) => {
    props.setPassword(event.target.value);
  };
  return (
    <form>
      <input id="password" type="password" placeholder="password" onChange={passwordHandler} value={props.password} />
    </form>
  );
}


export default UserPassword;