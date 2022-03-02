import { React } from "react";
import { Avatar, Button } from "@material-ui/core";

//file imports
import useStyles from "../components/styles/home_S";

export default function UserList(props) {
  const classes = useStyles();
  return (
    <div>
      <Button
      onClick={() => props.handleA(props.data.userName)}
        className={classes.UserNode}
        variant="contained"
        color="primary"
        startIcon={
          <Avatar
            alt={props.data.userName}
            className={classes.purple}
          ></Avatar>
        }
      >
        {props.data.userName}
      </Button>
    </div>
  );
}
