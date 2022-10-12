import React from 'react';

function Button(props) {
  const {id,password} = props.disable;
  return (
    <div className="btn-sign">
      <button id="sign-up" disabled={id || password} onClick={props.signUpBtnHandler}>Sign UP</button>
      <button id="sign-in" disabled={id || password} onClick={props.onClick}>Sign In</button>
    </div>
  );
}

export default Button;
