import { useState } from 'react';
import axios from 'axios';
import { text } from '@fortawesome/fontawesome-svg-core';
//import HttpRequest from "../../../HttpRequest";


function AdminLogin() {

  const  [adminId, setAdminId] = useState('')
  const  [password, setPassword] = useState('')
  const  [loginStatus, setLoginStatus] = useState('')

/*   const Login = () => {
    HttpRequest({
      method: 'POST',
      url: `/api/admin/login`,
      adminId: adminId, 
      password: password
    });
  }; */

  function validateForm() {
    return text.length > 0 && password.length > 0;
  }

/*   async function Login(event) {
    event.preventDeafault();

    try {
      await axios.post("http://localhost:5000/api/admin/login", {
        adminId: adminId,
        password: password
      }).then( res => {
        alert(res.data.status);
    })
    } catch (e) {
      alert(e.message);
    }
  }  */

/*   async function Login () {
    axios.post("http://localhost:5000/api/admin/login", {
      adminId: adminId,
      password: password
    }).then( res => {
        alert(res.data.status);
    })
    .catch( error => {
      alert(error.message);
    })
  }; */

    const Login = () => {
    axios.post("http://localhost:5000/api/admin/login", {
      adminId: adminId,
      password: password
    }).then( res => {
        alert(res.data.status);
    })
    .catch( error => {
      alert(error);
    })
  }; 

  return (
    <form>
      <div className='form-inner'>

        <h2>Login</h2>

        <div className='form-group'>
          <label>Name:</label>
          <input type='text' onChange={(e)=> {setAdminId(e.target.value)}} />
        </div>

        <div className='form-group'>
          <label>Password:</label>
          <input type='password' onChange={(e)=> {setPassword(e.target.value)}} />
        </div>

        <button type='submit' disabled={!validateForm()} onClick={Login}> Login </button>

      </div>
    </form>
  )
}

export default AdminLogin