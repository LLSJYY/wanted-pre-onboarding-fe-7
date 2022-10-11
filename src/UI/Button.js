const Button = (props) => {
 
 
  return (<div className="btn-sign">
    <button id="sign-up" disabled={props.disable.id || props.disable.password} onClick={props.signUpBtnHandler}>Sign UP</button>
    <button id="sign-in" disabled={props.disable.id || props.disable.password} onClick={props.onClick}>Sign In</button>
    </div>
  );

}

export default Button;