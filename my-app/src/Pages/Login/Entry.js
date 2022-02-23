import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Home from '../Home/home'

async function RegisterUser(credentials) {
  return axios.post('/signup', credentials);
}

export function Register() {
  const [usrName, setUserName] = useState();
  const [pass, setPassword] = useState();
  const [email, setEmail] = useState();
  const [isIn, setIn] = useState(false);
  const [code, setCode] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await RegisterUser({
        usrName,
        email,
        pass
      });
      setIn(true)
      setCode(null)
    } catch(err) {
      console.log(err.response.data);
      setCode(err.response.data.ErrorCode)
    }
  }
  if (isIn) {
    return (
      <Home usrName = { usrName }/>
    )
  }
  else {
    let error;
    if (code) {
      if (code === 'USERNAME') {
        error = <p>username taken</p>
      }
      if (code === 'EMAIL') {
        error = <p>email taken</p>
      }
    }
    return (
      <div id="container">
        <form onSubmit={handleSubmit}>
            <label for="usrName"> User Name </label>
            <input type="text" id="usrName" onChange={e => setUserName(e.target.value)}/><br />
            <label for="email"> Email </label>
            <input type="text" id="email" onChange={e => setEmail(e.target.value)}/><br/>
            <label for="pass"> Password </label>
            <input type="password" id="pass" onChange={e => setPassword(e.target.value)}/><br />
            <input type="submit" value="Register" />
        </form>
        {error}
        <br/><br/>
        <Link to="/login">Login</Link>
      </div>
    );
  }
}

async function loginUser(credentials) {
  return fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export function Login() {
  const [usrName, setUserName] = useState();
  const [pass, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      usrName,
      pass
    });
    console.log(token);
  }

  return (
    <div id="container">
      <form onSubmit={handleSubmit}>
          <label for="usrName"> User Name </label>
          <input type="text" id="usrName" onChange={e => setUserName(e.target.value)}/>
          <label for="pass"> Password </label>
          <input type="password" id="pass" onChange={e => setPassword(e.target.value)}/>
          <input type="submit" value="login" />
      </form>
    </div>
  );
}