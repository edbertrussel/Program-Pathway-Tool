import { useState } from 'react';
import axios from 'axios';
import { text } from '@fortawesome/fontawesome-svg-core';
import logo from "../../../logo.png";
import "./AdminLogin.css";
import { Navigate } from "react-router-dom";


function AdminLogin() {

  const  [adminId, setAdminId] = useState('')
  const  [password, setPassword] = useState('')
  const  [loginStatus, setLoginStatus] = useState('')
  state = { redirect: false }


  function validateForm() {
    return text.length > 0 && password.length > 0;
  }

  const Login = (e) => {
    e.preventDefault();

    axios.post("http://localhost:5000/api/admin/login", {
      adminId: adminId,
      password: password
    }).then( res => {
       alert(res.data.status);

    }) 
    .catch( error => {
      // alert(error.response.data.error);
      setLoginStatus('ID or Password is incorrect!');
    })
  }; 
  
  return (
    <div className='container'>
    <img src={logo} className="logo"></img>

      <form className='login_form'>

        <div className='font'>Admin ID</div>
        <input type='text' onChange={(e)=> {setAdminId(e.target.value)}} />

        <div className='font font2'>Password</div>
        <input type='password' onChange={(e)=> {setPassword(e.target.value)}} />

        <button type='submit' disabled={!validateForm()} onClick={Login}> Login </button>

        <div className='errormsg'>{loginStatus}</div>

      </form>

    </div>
  )
}

export default AdminLogin