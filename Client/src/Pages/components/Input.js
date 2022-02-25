// external dependency imports
import {React, useState } from "react";


// Style Imports
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) =>
  createStyles({
    wrapForm : {
        display: "flex",
        justifyContent: "center",
        width: "95%",
        margin: '20px'
    },
    wrapText  : {
        width: "100%"
    },
    button: {
        borderRadius: '50px',
        background: 'linear-gradient(42deg, #cf63cf 30%, #496387 60%)',
        border: 0,
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        margin: '0 20px'
    },
  })
);


export const TextInput = (props) => {
    const [textValue, setTextValue] = useState('')

    const onSubmit = (event) => {
    event.preventDefault();
    const value = textValue;
    props.onClick(value);
    setTextValue('');
    event.target.value = ''
    };

    const classes = useStyles();
    return (
        <>
            <form target = '_self' className={classes.wrapForm} onSubmit={onSubmit}>
            <TextField
                id="standard-text"
                label="Input Message"
                className={classes.wrapText}
                value = {textValue}
                variant="outlined"
                onChange={e => setTextValue(e.target.value)}
                //margin="normal"
            />
            <Button variant="contained" color="primary" className={classes.button} onClick={() => props.onClick(textValue)} >
                <SendIcon />
            </Button>
            </form>
        </>
    )
}



