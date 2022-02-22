import {React, useState} from "react";
// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
// import { Paper } from "@material-ui/core";
// import { TextInput } from '../components/Input';
// import { MessageLeft, MessageRight } from "../components/Message";
// import Dashboard from '../components/Dashboard'
// import { io } from "socket.io-client";

function Home() {
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

  return (
    <div>
        {/* <Dashboard /> */}
    <ul id="messages"></ul>
    <form id="form" action="">
      <input id="input" autocomplete="off" /><button>Send</button>
      <button id="logout"><a href="/logout">logout</a></button>
    </form>
  </div>
  );
}

export default Home;