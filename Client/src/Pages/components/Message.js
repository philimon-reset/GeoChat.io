// external dependency imports
import React from "react";

// style imports
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepPurple } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) =>
  createStyles({
    messageRow: {
      display: 'flex',
      margin: '10px',
      alignItems: 'baseline',
    },
    messageRowRight: {
      display: "flex",
      justifyContent: 'flex-end',
      margin: '10px',
      alignItems: 'baseline',
    },
    messageBlue: {
      position: "relative",
      marginLeft: "20px",
      marginBottom: "10px",
      padding: "20px",
      color: '#7c8395',
      backgroundColor: 'white',
      maxWidth: "40vw",
      //height: "50px",
      textAlign: "left",
      borderRadius: "20px",
      boxShadow: '0 2px 5px 4px rgba(33, 203, 243, .3)'
    },
    messageGray: {
      position: "relative",
      marginRight: "20px",
      marginBottom: "10px",
      padding: "20px",
      color: 'white',
      backgroundColor: "#1a233b",
      maxWidth: "40vw",
      // height: "30px",
      textAlign: "left",
      borderRadius: "20px",
      boxShadow: '0 3px 5px 2px rgba(33, 19, 13, .3)'
    },

    messageContent: {
      padding: 0,
      margin: 0,
      overflowWrap: 'break-word'
    },
    messageTimeStampRight: {
      fontSize: ".85em"
    },
    messageTimeStampLeft: {
      fontSize: ".85em"
    },

    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
      width: theme.spacing(7),
      height: theme.spacing(7),
      alignSelf: 'center',
      margin: '1%',
      order: '0'
    },
    blue: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
      width: theme.spacing(7),
      height: theme.spacing(7),
      alignSelf: 'center',
      margin: '1%',
      order: '1'
    },
    avatarNothing: {
      color: "transparent",
      backgroundColor: "transparent",
      width: theme.spacing(4),
      height: theme.spacing(4)
    },
    displayName: {
      marginLeft: "10 rem",
    },
    displayNameRight: {
      marginRight: "5rem",
    }
  })
);

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
