import { useState } from 'react';
import axios from 'axios';
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

  const Login = () => {
    axios.post("http://localhost:5000/api/admin/login", {
      adminId: adminId,
      password: password
    }).then( res => {
        alert(res.data.status);
        alert(res.data.message);
        //setLoginStatus(res.data.status);
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
          <label htmlFor='name'>Name:</label>
          <input type='text' onChange={(e)=> {setAdminId(e.target.value)}} />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password:</label>
          <input type='password' onChange={(e)=> {setPassword(e.target.value)}} />
        </div>

        <button onClick={Login}>LOGIN</button>

        <h1>{loginStatus}</h1>
      </div>
    </form>
  )
}

export default AdminLogin