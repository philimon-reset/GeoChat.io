// Style Imports
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      width: "100%",
      height: "6rem",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      borderRadius: "15px",
      boxShadow: "0 3px 5px 2px rgba(33, 19, 13, .3)",
    },
    container: {
      width: "100%",
      height: "100%",
    },
    messagesBody: {
      width: "calc( 100% - 20px )",
      margin: 10,
      padding: 8,
      height: "calc( 100% - 110px )",
      backgroundColor: "#f3f6fb",
      fontFamily: "Roboto, sans-serif",
      fontSize: "1em",
      boxShadow: "0 3px 5px 2px rgba(33, 19, 13, .3)",
    },
  })
);

export default useStyles;
