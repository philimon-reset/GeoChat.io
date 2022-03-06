// external dependency imports
import date from "date-and-time";
import { React, useRef, useState, useEffect, useContext } from "react";
import { Paper } from "@material-ui/core";

// File Imports
import { TextInput } from "./Input";
import { MessageLeft, MessageRight } from "./Message";
import useStyles from "./styles/dashboard_S";
import { getMessages } from "../../services/MessageService";
import { Context } from "./State_Managment/IsActive";

//socket imports
import socket from "../../services/socket";

export default function Dashboard(props) {
  const [output, setoutput] = useState(null);
  const { active } = useContext(Context);
  const messagesEndRef = useRef(null);
  const { currentUser, Forward } = props;

  // fetchmessages
  const fetchMessages = async () => {
    const res = await getMessages(active.userName, currentUser);
    setoutput(res.data.messages);
  };

  // io stuff
  socket.on("PrivateMsgForward", (message) => {
    if (active?.userName === message.sender) {
      fetchMessages();
    } else if (message.sender === currentUser) {
      fetchMessages();
    } else {
      Forward(message);
    }
  });

  const scrollToBottom = () => {
    messagesEndRef.current &&
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  function handleSubmit(message) {
    const pattern = date.compile("MMM D YYYY h:m:s A");
    const compiledMsg = {
      room: active.channel,
      message,
      timestamp: date.format(new Date(), pattern),
      sender: currentUser,
    };

    socket.emit("PrivateMsgSent", compiledMsg);
    console.log("sending", compiledMsg);

    if (output) {
      setoutput([...output, compiledMsg])
    }
  }

  useEffect(scrollToBottom, [output]);

  useEffect(() => {
    fetchMessages();
  }, [active]);

  const classes = useStyles();
  return (
    <>
      {Object.keys(active).length ? (
        <div className={classes.container}>
          <Paper id="style-1" className={classes.messagesBody}>
            {output &&
              output.map((x, inx) =>
                x.sender === currentUser ? (
                  <MessageRight
                    key={inx}
                    message={x.message}
                    timestamp={x.timestamp}
                    photoURL="https://lh3.googleusercontent.com/a-/au=s96-c"
                    displayName={x.sender}
                    avatarDisp={false}
                  />
                ) : (
                  <MessageLeft
                    key={inx}
                    message={x.message}
                    timestamp={x.timestamp}
                    photoURL="https://lh3.googleusercontent.com/a-/au=s96-c"
                    displayName={x.sender}
                    avatarDisp={false}
                  />
                )
              )}
            <div ref={messagesEndRef} />
          </Paper>
          <Paper className={classes.paper}>
            <TextInput onClick={(i) => handleSubmit(i)} />
          </Paper>
        </div>
      ) : (
        <div>0</div>
      )}
    </>
  );
}
