// external dependency imports
import React from "react";

// style imports
import Avatar from "@material-ui/core/Avatar";
import useStyles from "./styles/message_S";

export const MessageLeft = (props) => {
  const message = props.message ? props.message : "no message";
  const timestamp = props.timestamp ? props.timestamp : "";
  const photoURL = props.photoURL ? props.photoURL : "";
  const displayName = props.displayName ? props.displayName : "Player 1";
  const classes = useStyles();
  return (
    <>
      <div className={classes.messageRow}>
        <Avatar
          alt={displayName}
          className={classes.purple}
          src={photoURL}
        ></Avatar>
        <div>
          <div className={classes.displayName}>{displayName}</div>
          <div className={classes.messageBlue}>
            <div>
              <p className={classes.messageContent}>{message}</p>
            </div>
            <div className={classes.messageTimeStampLeft}>{timestamp}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export const MessageRight = (props) => {
  const classes = useStyles();
  const displayName = props.displayName ? props.displayName : "Player 1";
  const message = props.message ? props.message : "no message";
  const timestamp = props.timestamp ? props.timestamp : "";
  const photoURL = props.photoURL ? props.photoURL : "";
  return (
    <div className={classes.messageRowRight}>
      <Avatar
        alt={displayName}
        className={classes.blue}
        src={photoURL}
      ></Avatar>
      <div>
        <div className={classes.displayNameRight}>{displayName}</div>
        <div className={classes.messageGray}>
          <p className={classes.messageContent}>{message}</p>
          <div className={classes.messageTimeStampRight}>{timestamp}</div>
        </div>
      </div>
    </div>
  );
};
