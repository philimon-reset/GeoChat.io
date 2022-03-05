import { React, useContext } from "react";
import { Avatar, Button } from "@material-ui/core";

//file imports
import useStyles from "../components/styles/home_S";
import { Context } from "../components/State_Managment/IsActive";

export default function UserList(props) {
  const classes = useStyles();
  const { active, setactive } = useContext(Context);

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
