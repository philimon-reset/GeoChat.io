import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import useAuth from '../../hooks/useAuth'

export function Register() {
  const [usrName, setUserName] = useState();
  const [pass, setPassword] = useState();
  const [email, setEmail] = useState();
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await auth.signUp({
      usrName,
      email,
      pass
    });
    if (res) {
      navigate("/home");
    } else {
      navigate("/register");
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
      <br/><br/>
      <Link to="/login">Login</Link>
    </div>
  );
}

export function Login() {
  const [usrName, setUserName] = useState();
  const [pass, setPassword] = useState();
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await auth.signIn({
      usrName,
      pass
    });
    if (res) {
      navigate("/home");
    } else {
      navigate("/login");
    }
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