import {React, useState, useEffect} from "react";
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { TextInput } from '../components/Input';
import { MessageLeft, MessageRight } from "../components/Message";
import Dashboard from '../components/Dashboard'
import { io } from "socket.io-client";

export default function Home(props) {

  const [loggedIn, setIn] = useState(false);

  useEffect(() => {
    axios.get('/isIn').then(
      setIn(true)
    ).catch();
  }, [])

  // let sock = io();

  // let sendForm = document.getElementById("form");
  // let input = document.getElementById("input");
  // let logout = document.getElementById("logout");

  // sendForm.addEventListener("submit", function (event) {
  //   event.preventDefault();

  //   if (input.value) {
  //     sock.emit("chat message", input.value);
  //     input.value = "";
  //   }
  // });
  if (loggedIn) {
    return (
      <div>
        <p>Hello</p>
      {/* <Dashboard />
      <ul id="messages"></ul>
      <form id="form" action="">
        <input id="input" autocomplete="off" /><button>Send</button>
        <button id="logout"><a href="/logout">logout</a></button>
      </form> */}
    </div>
    );
  } else {
    return(
      <Navigate to={"/login"} />
    );   
  }
}