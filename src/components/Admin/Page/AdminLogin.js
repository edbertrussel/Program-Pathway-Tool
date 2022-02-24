import React, { useState } from 'react';
import './FormFill.css';

function FormFill({ Login, error }) {

  const [details, setDetails] = useState({name:"", password:""});

  const submitHandler = e => {
    e.preventDefault();

    Login(details);
  }

  return (
    <form onSubmit={submitHandler}>
      <div className='form-inner'>

        <h2>Login</h2>
        {(error != "") ? (<div className='error'>{error}</div>) : ""}
        <div className='form-group'>
          <label htmlFor='name'>Name:</label>
          <input type='text' name='name' id='name' onChange={e => setDetails({...details, name: e.target.value})} value={details.name}></input>
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password:</label>
          <input type='password' name='password' id='password' onChange={e => setDetails({...details, password: e.target.value})} value={details.password}></input>
        </div>

        <input type='submit' value='Login'/>

      </div>
    </form>
  )
}

export default FormFill