// external dependency imports
import date from 'date-and-time';
import {React, useRef, useState, useEffect } from "react";
import { Paper } from "@material-ui/core";  

// File Imports
import { TextInput } from "./Input";
import { MessageLeft, MessageRight } from "./Message";
import useStyles from "./styles/dashboard_S"

//socket imports
import socket from "../../services/socket";

export default function Dashboard(props) {
  const [ input, setInput ] = useState([]);
  const [ output, setoutput ] = useState([]);
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  function handleSubmit(message) {
    const pattern = date.compile('MMM D YYYY h:m:s A');
    const new_input = input.concat([{message, now: date.format(new Date(), pattern)}])

    socket.emit("chat message", new_input[input.length - 1]);
    console.log("sending", new_input[input.length - 1]);

    setInput(new_input);
  }

  useEffect(scrollToBottom, [input]);

  // useEffect(() => {
  //   props.section && setoutput(
  //     output => [
  //       ...output,
  //       props.section.pop()
  //     ]);
  // }, [props.section]);
  const classes = useStyles();
  return (
    <div className={classes.container}>
        <Paper id="style-1" className={classes.messagesBody}>
        {/* <MessageLeft
            message=" const photoURL = props.photoURL ? props.photoURL : "
            timestamp= 'MM/DD 00:00'
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName=""
            avatarDisp={true}
          />
          <MessageLeft
            message="xxxxxhttps://yahoo.co.jp xxxxxxxxx"
            timestamp="MM/DD 00:00"
            photoURL=""
            displayName="https"
            avatarDisp={false}
          />
          <MessageLeft
            message="messageR"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={true}
          />
          <MessageRight
            message="messageR"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/au=s96-c"
            displayName="message3"
            avatarDisp={false}
          /> */}
          {output.message && output.map(x => (<MessageLeft
      message={x.message}
      timestamp={x.now}
      photoURL="https://lh3.googleusercontent.com/a-/au=s96-c"
      displayName={x.displayName}
      avatarDisp={false}
    />))}
          {input.map(x => (<MessageRight
      message={x.message}
      timestamp={x.now}
      photoURL="https://lh3.googleusercontent.com/a-/au=s96-c"
      displayName="Philimon"
      avatarDisp={false}
    />))}
          <div ref={messagesEndRef} />
        </Paper>
      <Paper className={classes.paper}>
        <TextInput onClick={(i) => handleSubmit(i)}/>
      </Paper>
    </div>
  );
}