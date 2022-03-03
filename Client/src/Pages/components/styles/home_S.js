// Style Imports
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { lightGreen } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) =>
  createStyles({
    UserNode: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      margin: "20px",
      borderRadius: "15px",
      width: "90%",
      color: "#",
    },
    notification: {
      borderRadius: "50%",
      backgroundColor: "red",
      width: "1rem",
      height: "1rem",
      position: "absolute",
      right: "1rem"
    },
    purple: {
      color: theme.palette.getContrastText(lightGreen[500]),
      backgroundColor: lightGreen[500],
      width: theme.spacing(7),
      height: theme.spacing(7),
      margin: "1rem",
      order: "0",
    },
  })
);

export default useStyles;
