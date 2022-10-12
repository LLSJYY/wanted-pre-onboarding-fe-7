import axios from "axios";
import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Main.css"
import UserId from "./UserId";
import UserPassword from "./UserPassword";
import Button from "./Button";

const Main = () => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setpPassword] = useState(''); // 추후 useRef로 리팩토링 or 두개 합치기.
  const [disable, setDisable] = useState({ id: true, password: true });
  const accessToken = localStorage.getItem("wtd_tk");

  useEffect(() => {
    if (accessToken) {
      navigate('/todos');
    }
  }, [accessToken]);

  const updateid = (id) => {
    const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    setId(id);
    setDisable({
        ...disable
        , id: true
      });
    if (id.match(emailformat)) {
      setDisable({
          ...disable,
          id: false
        });
    }
  }

  const updatepassword = (password) => {
    const passwordformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    setpPassword(password);
    setDisable({
        ...disable,
        password: true
      });
    if (password.match(passwordformat)) {
      setDisable({
         ...disable
         , password: false 
        });
    }
  } //여기다가 

  const loginBtnHandler = (e) => {
    e.preventDefault();
    setId('');
    setpPassword('');
    setDisable({
       id: true,
        password: true
       });
    postSignIn({ id, password });
  };


  const signUpBtnHandler = (e) => {
    e.preventDefault();
    setId('');
    setpPassword('');
    setDisable({ id: true, password: true });
    postSignUp({ id, password });
  };

  const postSignUp = ({ id, email }) => {
    axios.post("https://pre-onboarding-selection-task.shop/auth/signup", {
      "email": `${id}`,
      "password": `${email}`,
    }, {
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => {
    }).catch((err) => {
      console.warn(err);
    }
    );
  }
  const postSignIn = ({ id, email }) => { //중복된 값 확인해보고싶어요 ... get 방식..은안되겟지
    axios.post("https://pre-onboarding-selection-task.shop/auth/signin", {
      "email": `${id}`,
      "password": `${email}`,
    }, {
      headers: {
        "Content-Type": "application/json",
      }
    }).then((response) => {
      localStorage.setItem('wtd_tk', response.data.access_token);
      navigate('/todos');
    }).catch((err) => {
      // 에러 핸들링
      console.warn(err);
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
          <UserId setId={updateid} id={id}></UserId>
          <UserPassword setPassword={updatepassword} password={password}></UserPassword>
        </div>
      </div>
      <Button disable={disable} onClick={loginBtnHandler} signUpBtnHandler={signUpBtnHandler}></Button>
    </div>
  )


}

export default Main;