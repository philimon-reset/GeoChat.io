import {React, useState, useEffect} from "react";
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) =>
  createStyles({
    wrapForm : {
        display: "flex",
        justifyContent: "center",
        width: "95%",
        margin: `${theme.spacing(0)} auto`
    },
    wrapText  : {
        width: "100%"
    },
    button: {
        //margin: theme.spacing(1),
    },
  })
);


export const TextInput = (props) => {
    const [textValue, setTextValue] = useState('')

    const classes = useStyles();
    return (
        <>
            <form className={classes.wrapForm}>
            <TextField
                id="standard-text"
                label="Input Message"
                className={classes.wrapText}
                onChange={e => setTextValue(e.target.value)}
                //margin="normal"
            />
            <Button variant="contained" color="primary" className={classes.button} onClick={() => props.onClick(textValue)}>
                <SendIcon />
            </Button>
            </form>
        </>
    )
}



