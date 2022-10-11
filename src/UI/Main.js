import axios from "axios";
import "./Main.css"
import UserId from "./UserId";
import UserPassword from "./UserPassword";
import {React,useEffect,useState} from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const [id,setId] = useState('');
  const [password,setpPassword] = useState(''); // 추후 useRef로 리팩토링 or 두개 합치기.
  const [disable,setDisable] = useState({id:true,password:true});
  const accessToken = localStorage.getItem("wtd_tk");

  useEffect(()=> {
    if(accessToken){
      navigate('/todos');
    }
  },[accessToken]);

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
    postSignIn({id,password})
  };

  
  const signUpBtnHandler = (e) => {
    e.preventDefault();
    setId('');
    setpPassword('');
    setDisable({id:true,password:true})
    postSignUp({id,password})
  };
  
  const postSignUp = ({id,email}) => { //중복된 값 확인해보고싶어요 ... get 방식..은안되겟지
   axios.post("https://pre-onboarding-selection-task.shop/auth/signup",{
    "email":`${id}`,
    "password": `${email}`,
  },{
    headers: {
      "Content-Type": "application/json",
    }
  }).then(function (response) {
    // 성공 핸들링
    console.log(response);
  }).catch(function (error) {
    // 에러 핸들링
    console.log(error);
  })
  }
  const postSignIn = ({id,email}) => { //중복된 값 확인해보고싶어요 ... get 방식..은안되겟지
    console.log(id,email)
   axios.post("https://pre-onboarding-selection-task.shop/auth/signin",{
    "email":`${id}`,
    "password": `${email}`,
  },{
    headers: {
      "Content-Type": "application/json",
    }
  }).then(function (response) {
        localStorage.setItem('wtd_tk',response.data.access_token);
        navigate('/todos');
  }).catch(function (error) {
    // 에러 핸들링
    console.log(error);
  })
  }
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
      <Button disable={disable} onClick = {loginBtnHandler} signUpBtnHandler={signUpBtnHandler}></Button>
    </div>
  )


}

export default Main;