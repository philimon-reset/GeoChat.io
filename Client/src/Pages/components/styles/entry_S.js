// style imports
import { createStyles, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) =>
  createStyles({
    introText: {
      margin: "5%",
      color: "#0b3866",
      fontSize: "5em",
      fontFamily: "Roboto, Helvetica, Arial, sans-serif",
      textAlign: "center",
    },
    paper: {
      width: "100%",
      height: "6rem",
      display: "flex",
      flexDirection: "column",
      position: "relative",
    },
    containerL: {
      background: "#EFFFFD",
      height: "85%",
      borderRadius: "15px",
      boxShadow: "0 3px 5px 2px rgba(33, 19, 13, .3)",
      width: "70%",
      position: "absolute",
      top: "6%",
      zIndex: 10,
      margin: "1.5rem",
      color: "#582B11",
    },
    containerR: {
      backgroundColor: "#EFFFFD",
      height: "70%",
      borderRadius: "15px",
      boxShadow: "0 3px 5px 2px rgba(33, 19, 13, .3)",
      width: "25%",
      position: "absolute",
      top: "-7%",
      margin: "10rem",
      zIndex: 0,
      transition: "all 1s",
    },
    center: {
      margin: "auto",
      width: "60%",
      padding: "20px",
    },
    wrapText: {
      margin: "5px",
      width: "100%",
    },
    wrapB: {
      padding: "1rem",
      width: "100%",
      marginLeft: ".3rem",
      margin: "1rem",
      boxShadow: "0 3px 5px 2px rgba(33, 19, 13, .3)",
    },
    wrapBl: {
      color: "#fff",
      backgroundColor: "#3f51b5",
      position: "absolute",
      left: "20%",
      bottom: "3%",
      padding: ".8rem",
      width: "60%",
      margin: "1rem",
      boxShadow: "0 3px 5px 2px rgba(33, 19, 13, .3)",
      borderRadius: "15px",
      "&:hover": {
        backgroundColor: "#303f9f",
      },
    },
    messagesBody: {
      width: "calc( 100% - 20px )",
      margin: 10,
      height: "calc( 100% - 80px )",
      fontFamily: "Dongle, sans-serif",
      fontSize: "1.4em",
      boxShadow: "0 3px 5px 2px rgba(33, 19, 13, .3)",
    },
  })
);

// SVG i don't know where to put
export const style = {
  height: "100vh",
  background: "hsla(148, 89%, 78%, 1)",
  background:
    "linear-gradient(90deg, hsla(148, 89%, 78%, 1) 0%, hsla(210, 81%, 22%, 1) 100%)",
  background:
    "-moz-linear-gradient(90deg, hsla(148, 89%, 78%, 1) 0%, hsla(210, 81%, 22%, 1) 100%)",
  background:
    "-webkit-linear-gradient(90deg, hsla(148, 89%, 78%, 1) 0%, hsla(210, 81%, 22%, 1) 100%)",
  filter:
    'progid: DXImageTransform.Microsoft.gradient( startColorstr="#95F9C3", endColorstr="#0B3866", GradientType=1 )',
};