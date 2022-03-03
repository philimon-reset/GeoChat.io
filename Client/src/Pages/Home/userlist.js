import { React, useState } from "react";
import { Avatar, Button } from "@material-ui/core";

//file imports
import useStyles from "../components/styles/home_S";

export default function UserList(props) {
  const classes = useStyles();
  return (
    <div>
      <Button
      onClick={() => props.handleA(props.data)}
        className={classes.UserNode}
        variant="contained"
        color={props.isActive ? "secondary" : "primary" }
        startIcon={
          <Avatar
            alt={props.data.userName}
            className={classes.purple}
          ></Avatar>
        }
      >
        {props.data.userName}
        {props.newMessage && <div className={classes.notification}></div>}
      </Button>
    </div>
  );
}
