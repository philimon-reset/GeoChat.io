import { React, useContext } from "react";
import { Avatar, Button } from "@material-ui/core";

// Style imports
import useStyles from "../components/styles/home_S";

// context import for global state
import { Context } from "../components/State_Managment/IsActive";

// component for an active user displayed on a navbar
export default function UserList(props) {
  const classes = useStyles();
  const { active, setactive } = useContext(Context);

  // set clicked component as active component
  // also remove notification sign if present
  const handleA = () => {
    if (props.data.hasNotification) {
      delete props.data.hasNotification;
    }
    active.userName === props.data.userName
      ? setactive({})
      : setactive(props.data);
  };

  return (
    <div>
      <Button
        onClick={handleA}
        className={classes.UserNode}
        variant="contained"
        color={
          active.userName === props.data.userName ? "secondary" : "primary"
        }
        startIcon={
          <Avatar alt={props.data.userName} className={classes.purple}></Avatar>
        }
      >
        {props.data.userName}
        {props.data.hasNotification &&
          active.userName !== props.data.userName && (
            <div className={classes.notification}></div>
          )}
      </Button>
    </div>
  );
}
