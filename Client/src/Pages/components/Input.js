// external dependency imports
import { React, useState } from "react";

// Style Imports
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import useStyles from "./styles/input_S";

// component incharge of handling user input
export const TextInput = (props) => {
  const [textValue, setTextValue] = useState("");

  // on submit pass written value up the component
  const onSubmit = (event) => {
    event.preventDefault();
    const value = textValue;
    props.onClick(value);
    setTextValue("");
    event.target.value = "";
  };

  const classes = useStyles();
  return (
    <>
      <form target="_self" className={classes.wrapForm} onSubmit={onSubmit}>
        <TextField
          id="standard-text"
          label="Input Message"
          className={classes.wrapText}
          value={textValue}
          variant="outlined"
          onChange={(e) => setTextValue(e.target.value)}
          //margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={onSubmit}
        >
          <SendIcon />
        </Button>
      </form>
    </>
  );
};
