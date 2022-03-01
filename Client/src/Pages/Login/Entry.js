// External imports
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// style imports
import Button from '@material-ui/core/Button';
import Textfield from '@material-ui/core/Textfield';
import { useStyles } from '../components/styles/entry_S';

// File imports
import { logIn, checkSesh } from '../../services/AuthService';
import { register } from '../../services/UserService';
import Home from '../Home/home';

export function Register() {
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
  }
  const classes = useStyles();
  if (!isIn){
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
  } else {
    return <Home />
  }
}

export function Login() {
  const [usrName, setUserName] = useState();
  const [pass, setPassword] = useState();
  const [isIn, setIn] = useState(false);

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

  const classes = useStyles();
  if (!isIn){
  return (
    <div id="container">
      <form target = '_self' class={classes.center}>
          <Textfield className={classes.wrapText} label="Username" type="text" id="usrName" variant="outlined" color="primary" value = {usrName} onChange={e => setUserName(e.target.value)}/><br />
          <Textfield className={classes.wrapText} label="Password" type="password" id="pass" variant="outlined" color="primary" value = {pass} onChange={e => setPassword(e.target.value)}/><br />
          <Button type="submit" variant="contained" color="primary" className={classes.wrapB}  onClick={handleSubmit}>Login</Button>
      </form>
    </div>
  );
  } else {
    return <Home />
  }
}