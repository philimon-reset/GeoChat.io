import React, { useState } from 'react';
import { Link } from 'react-router-dom';

async function RegisterUser(credentials) {
  return fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export function Register() {
  const [usrName, setUserName] = useState();
  const [pass, setPassword] = useState();
  const [email, setEmail] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await RegisterUser({
      usrName,
      email,
      pass
    });
    console.log(token);
  }
  console.log('hello')
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
      <br/><br/>
      <Link to="/login">Login</Link>
    </div>
  );
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