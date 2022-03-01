import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Paper, Grid } from "@material-ui/core";
import Box from '@mui/material/Box';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { urlencoded } from 'body-parser';



export const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      width: '100%',
      height: '6rem',
      display: "flex",
      flexDirection: "column",
      position: "relative",

    },
    containerL: {
      // float: 'left',
      height: '98.3vh',
      borderRadius: '15px',
      boxShadow: '0 3px 5px 2px rgba(33, 19, 13, .3)',
      width: '75vw',
      position: 'absolute'
    },
    containerR: {
      // float: 'left',
      height: '60vh',
      borderRadius: '15px',
      boxShadow: '0 3px 5px 2px rgba(33, 19, 13, .3)',
      background: '#fff',
      width: '30vw',
      position: 'absolute',
      right: 0,
      margin: '10rem'
    },
    center: {
      margin: 'auto',
      width: '60%',
      padding: '20px'
    },
    wrapText : {
      margin: '5px',
      width: '100%'
    },
    wrapB : {
      position: 'absolute',
      right: 100,
      padding: '.8rem',
      width: '25%',
      margin: '1rem',
      boxShadow: '0 3px 5px 2px rgba(33, 19, 13, .3)'
    },
    messagesBody: {
      width: "calc( 100% - 20px )",
      margin: 10,
      height: "calc( 100% - 80px )",
      fontFamily: 'Dongle, sans-serif',
      fontSize: '1.4em',
      boxShadow: '0 3px 5px 2px rgba(33, 19, 13, .3)'
    }
  })
);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 7 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function BasicTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', margin: '2rem auto', position: 'absolute'}}>
      <Box sx={{ borderBottom: 2, borderColor: 'divider', display: 'flex', justifyContent: 'space-evenly' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Login" {...a11yProps(0)} />
          <Tab label="Register" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {props.Login_C}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {props.Register_C}
      </TabPanel>
    </Box>
  );
}


export function Landing(props) {
  const classes = useStyles();
  return(
    <Grid container style={{position: 'relative'}}>
      <Grid item className={classes.containerL}>
        <Paper />
      </Grid>
      <Grid item className={classes.containerR}>
        <Paper>
          <BasicTabs Login_C={props.Login_C} Register_C={props.Register_C}/>
        </Paper>
      </Grid>
    </Grid>
  )
}