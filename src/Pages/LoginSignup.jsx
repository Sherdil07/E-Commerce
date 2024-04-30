import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [state,setState]=useState("Login")


const[formData,setFormData]=useState({
  username:"",
  password:"",
  email:""

})


const changeHandler = (e) => {
  const { name, value } = e.target;
  setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: value,
  }));
};




const login=async ()=>{
console.log("Login Function executed",formData);
try {
  const response = await fetch('http://localhost:4000/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  
  const responseData = await response.json();

  if (responseData.success) {
    localStorage.setItem('auth-token', responseData.token);
    window.location.replace('/');
  }else{
    alert(responseData.errors)
  }
} catch (error) {
  console.error('Error signing up:', error);
  // Handle error appropriately, such as displaying an error message to the user
}


}
const signup = async () => {
  console.log("Signup Function executed", formData);
  try {
    const response = await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    const responseData = await response.json();

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    }else{
      alert(responseData.errors)
    }
  } catch (error) {
    console.error('Error signing up:', error);
    // Handle error appropriately, such as displaying an error message to the user
  }
};




  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
         {state==="Sign Up"?<input type="text"  placeholder="Your Name" name="username" value={formData.username} onChange={changeHandler}  />:<></>} 
          <input type="email" placeholder="Email Address"  name="email" value={formData.email} onChange={changeHandler}  />
          <input type="password"  placeholder="Password" name="password" value={formData.password} onChange={changeHandler} />
        </div>
        <button onClick={() => { state === 'Login' ? login() : signup() }}>Continue</button>


        {state==='Sign Up'?<p className="loginsignup-login">
          Already have an account? <span onClick={()=>{setState("Login")}}>Login here</span>
        </p>:<p className="loginsignup-login">
          Create an Account? <span onClick={()=>{setState("Sign Up")}}>Click here</span>
        </p>}
        
        
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing ,i agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  );
};
export default LoginSignup;
