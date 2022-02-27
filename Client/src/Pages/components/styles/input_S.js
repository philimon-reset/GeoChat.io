// Style Imports
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapForm : {
        display: "flex",
        justifyContent: "center",
        width: "95%",
        margin: '20px'
    },
    wrapText  : {
        width: "150%"
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

export default useStyles;