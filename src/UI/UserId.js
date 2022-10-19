const UserId = ({id,password,setId,setPassword}) => {
  const idHandler = (event) => {
    setId(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  return (
    <form>
      <input id="id" placeholder="id" onChange={idHandler} value={id} />
      <input id="password" type="password" placeholder="password" onChange={passwordHandler} value={password} />
    </form>
  );
}

export default UserId;