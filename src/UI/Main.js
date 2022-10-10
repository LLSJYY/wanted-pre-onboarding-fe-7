import "./Main.css"
import UserId from "./UserId";
import UserPassword from "./UserPassword";
import {React,useState} from "react";
import Button from "./Button";
const Main = () => {
  const [id,setId] = useState('');
  const [password,setpPassword] = useState('');
  const [disable,setDisable] = useState({id:true,password:true});

  const updateid = (id) => {
    const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    setId(id);
    setDisable({...disable,id:true})
    if(id.match(emailformat)){
      setDisable({...disable,id:false});
    } 
  }
  const updatepassword = (password) => {
    const passwordformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    setpPassword(password);
    setDisable({...disable,password:true})
    if(password.match(passwordformat)){
      setDisable({...disable,password:false});
    }
  }
  
  const loginBtnHandler = (e) => {
    e.preventDefault();
    setId('');
    setpPassword('');
    setDisable({id:true,password:true})
    console.log(id,password,disable);
  };
  
  return (
    <div className="loginbox">
      <p id="login">Login</p>
      <div className="inputbox">
        <div className="name">
          <span>ID</span> 
          <span>PW</span>
        </div>
        <div className="input">
          <UserId setId={updateid}  id={id}></UserId>
          <UserPassword setPassword={updatepassword} password={password}></UserPassword>
        </div>
      </div>
      <Button disable={disable} onClick = {loginBtnHandler}></Button>
    </div>
  )


}

export default Main;