import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { logIn, checkSesh } from '../../services/AuthService';
import { register } from '../../services/UserService';
import Home from '../Home/home';

export function Register() {
  const [usrName, setUserName] = useState();
  const [pass, setPassword] = useState();
  const [email, setEmail] = useState();
  const navigate = useNavigate();
  const [isIn, setIn] = useState(false);

  useEffect(() => {
    checkSesh().then((res) => {
      if (res) {
        setIn(true);
      }
    })
  })


  const handleSubmit = async e => {
    e.preventDefault();
    const res = await register({
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

  if (!isIn){
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
  } else {
    navigate("/home");
  }
}

export function Login() {
  const [usrName, setUserName] = useState();
  const [pass, setPassword] = useState();
  const [isIn, setIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkSesh().then((res) => {
      if (res) {
        setIn(true);
      }
    })
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await logIn({
      usrName,
      pass
    });
    setIn(res);
  }

  if (!isIn){
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
  } else{
    return <Home />;
  }
}