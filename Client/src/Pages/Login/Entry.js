// External imports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// style imports
import Button from "@material-ui/core/Button";
import Textfield from "@material-ui/core/Textfield";
import { useStyles } from "../components/styles/entry_S";

// File imports
import { logIn } from "../../services/AuthService";
import { register } from "../../services/UserService";

// Register Component
export function Register() {
  let navigate = useNavigate();

  // state bar for user information
  const [usrName, setUserName] = useState();
  const [pass, setPassword] = useState();
  const [email, setEmail] = useState();
  const [loginU, setLoginU] = useState(false);
  const [loginE, setLoginE] = useState(false);

  // Error handling for Register
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register({
      usrName,
      email,
      pass,
    });
    if (res.data.usrName) {
      navigate("/home", { state: res }, { replace: false });
    } else if (res.ErrorCode === "USERNAME") {
      setLoginU("UserName Taken");
      setLoginE(false);
    } else if (res.ErrorCode === "EMAIL") {
      setLoginE("Email Taken");
      setLoginU(false);
    } else {
      window.location.reload();
    }
  };

  const classes = useStyles();
  return (
    <div id="container">
      <form target="_self" class={classes.center}>
        {/* State exchanged to switch between error and passing components */}
        {loginU ? (
          <Textfield
            className={classes.wrapText}
            error
            label={loginU}
            type="text"
            id="usrName"
            variant="outlined"
            color="primary"
            value={usrName}
            onChange={(e) => setUserName(e.target.value)}
          />
        ) : (
          <Textfield
            className={classes.wrapText}
            label="Username"
            type="text"
            id="usrName"
            variant="outlined"
            value={usrName}
            onChange={(e) => setUserName(e.target.value)}
          />
        )}
        <br />
        {loginE ? (
          <Textfield
            className={classes.wrapText}
            error
            label={loginE}
            type="text"
            id="email"
            variant="outlined"
            color="primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        ) : (
          <Textfield
            className={classes.wrapText}
            label="Email"
            type="text"
            id="pass"
            placeholder="test@test.com"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
        <br />
        <Textfield
          className={classes.wrapText}
          type="password"
          label="Password"
          id="pass"
          variant="outlined"
          value={pass}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.wrapB}
          onClick={handleSubmit}
        >
          Register
        </Button>
      </form>
    </div>
  );
}

export function Login() {
  let navigate = useNavigate();

// state bar for user information
  const [usrName, setUserName] = useState();
  const [pass, setPassword] = useState();
  const [loginE, setLoginE] = useState(false);

  // Error handling for Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await logIn({
      usrName,
      pass,
    });
    if (res) {
      navigate("/home", { state: res }, { replace: false });
    } else {
      setLoginE(true);
    }
  };

  const classes = useStyles();
  return (
    <div id="container">
      <form target="_self" class={classes.center}>
        {/* State exchanged to switch between error and passing components */}
        {loginE ? (
          <Textfield
            className={classes.wrapText}
            error
            label="error"
            type="text"
            id="usrName"
            variant="outlined"
            color="primary"
            value={usrName}
            onChange={(e) => setUserName(e.target.value)}
          />
        ) : (
          <Textfield
            className={classes.wrapText}
            label="Username"
            type="text"
            id="usrName"
            variant="outlined"
            value={usrName}
            onChange={(e) => setUserName(e.target.value)}
          />
        )}
        <br />
        {loginE ? (
          <Textfield
            className={classes.wrapText}
            type="password"
            error
            label="error"
            id="pass"
            variant="outlined"
            color="primary"
            value={pass}
            onChange={(e) => setPassword(e.target.value)}
          />
        ) : (
          <Textfield
            className={classes.wrapText}
            type="password"
            label="Password"
            id="pass"
            variant="outlined"
            value={pass}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}
        <br />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.wrapB}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </form>
    </div>
  );
}
