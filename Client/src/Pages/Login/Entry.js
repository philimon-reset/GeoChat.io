// External imports
import React, { useEffect, useState, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

// style imports
import Button from '@material-ui/core/Button';
import Textfield from '@material-ui/core/Textfield';
import { useStyles } from '../components/styles/entry_S';

// File imports
import { logIn, checkSesh } from '../../services/AuthService';
import { register } from '../../services/UserService';
import Home from '../Home/home';


const reducer = (state, action) => {
  switch(action) {
    case "SUCCESS":
      return {
        error: null,
        hasSesh: true,
        loading: false
      }
    case "ERROR":
      return {
        error: true,
        hasSesh: false,
        loading: false
      }
    default:
      return state
  }
}


export function Register() {
  let navigate = useNavigate();
  const [usrName, setUserName] = useState();
  const [pass, setPassword] = useState();
  const [email, setEmail] = useState();
  const [isIn, setIn] = useState(false);

  useEffect(() => {
    checkSesh().then((res) => {
      if (res) {
        setIn(true);
      }
    })
  }, [])


  const handleSubmit = async e => {
    e.preventDefault();
    const res = await register({
      usrName,
      email,
      pass
    });
    setIn(res)
    if (res) {
      navigate('/home', {replace: false})
    }
  }
  const classes = useStyles();
  return (
    <div id="container">
      <form target = '_self' class={classes.center}>
          <Textfield className={classes.wrapText} label="Username" type="text" id="usrName" variant="outlined" color= "primary" value = {usrName} onChange={e => setUserName(e.target.value)}/><br />
          <Textfield className={classes.wrapText} label="Email" type="text" id="email" variant="outlined" color= "primary" placeholder="test@test.com" value = {email} onChange={e => setEmail(e.target.value)}/><br/>
          <Textfield className={classes.wrapText} label="Password" type="password" id="pass" variant="outlined" color= "primary" value = {pass} onChange={e => setPassword(e.target.value)}/><br />
          <Button type="submit" variant="contained" color="primary" className={classes.wrapB}  onClick={handleSubmit}>Register</Button>
      </form>
    </div>
  );
}

export function Login() {
  let navigate = useNavigate();
  const [usrName, setUserName] = useState();
  const [pass, setPassword] = useState();

  const [ state, dispatch ] = useReducer(reducer, {
    error: null,
    hasSesh: null,
    loading: true
  })

  useEffect(() => {
    checkSesh().then((res) => {
      if (res) {
        dispatch("SUCCESS")
      }
      else {
        dispatch("ERROR")
      }
    })
  }, [])

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await logIn({
      usrName,
      pass
    });
    if (res) {
      navigate('/home', {replace: false})
    }
  }

  const classes = useStyles();
  return (
    <div id="container">
      {state.loading ? <p>loading...</p>:
      <>
          <form target = '_self' class={classes.center}>
              <Textfield className={classes.wrapText} label="Username" type="text" id="usrName" variant="outlined" color="primary" value = {usrName} onChange={e => setUserName(e.target.value)}/><br />
              <Textfield className={classes.wrapText} label="Password" type="password" id="pass" variant="outlined" color="primary" value = {pass} onChange={e => setPassword(e.target.value)}/><br />
              <Button type="submit" variant="contained" color="primary" className={classes.wrapB}  onClick={handleSubmit}>Login</Button>
          </form>
      </>}
    </div>
  );
}