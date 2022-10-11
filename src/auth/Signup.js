import axios from "axios"

const Signup = () => {
  ]
  axios.post("https://pre-onboarding-selection-task.shop/auth/signup",{
    "email":String,
    "password": String
  }).then(function (response) {
    // 성공 핸들링
    console.log(response);
  }).catch(function (error) {
    // 에러 핸들링
    console.log(error);
  })
  return (
   <>
   </> 
  )
}

export default Signup;
