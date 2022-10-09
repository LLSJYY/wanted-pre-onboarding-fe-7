const Button = (props) => {
  console.log(props.disable)
  return (
    <button disabled={props.disable.id || props.disable.password} onClick={props.onClick}>LOGIN</button>
  );

}

export default Button;