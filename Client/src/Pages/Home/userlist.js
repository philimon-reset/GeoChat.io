import { React } from "react";
import { Avatar, Button } from "@material-ui/core";

//file imports
import useStyles  from "../components/styles/home_S";

export default function UserList(props) {
  const classes = useStyles();
  return <div>
    <Button className={classes.UserNode} variant="contained" color="primary" startIcon={<Avatar
          alt={props.data.displayName}
          className={classes.purple}
      ></Avatar>}>
        {props.data.displayName}
      </Button>
  </div>

}