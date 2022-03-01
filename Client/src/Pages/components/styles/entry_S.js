import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Paper, Grid, Button } from "@material-ui/core";
import Box from '@mui/material/Box';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Register, Login } from '../../Login/Entry'



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
      background: '#87f1ff',
      height: '95%',
      borderRadius: '15px',
      boxShadow: '0 3px 5px 2px rgba(33, 19, 13, .3)',
      width: '75vw',
      position: 'absolute',
      zIndex: 10,
      margin: '1.5rem',
      color: '#582B11'
    },
    containerR: {
      // float: 'left',
      height: '60vh',
      borderRadius: '15px',
      boxShadow: '0 3px 5px 2px rgba(33, 19, 13, .3)',
      background: '#dbe4ee',
      width: '30vw',
      position: 'absolute',
      margin: '10rem',
      zIndex: 20,
      transition: 'all 1s'
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
    wrapBl : {
      position: 'absolute',
      right: 120,
      bottom: '20%',
      padding: '.8rem',
      width: '40%',
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
        <Login/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Register/>
      </TabPanel>
    </Box>
  );
}


export function Landing(props) {
  const classes = useStyles();
  const [flip, setflip] = React.useState({opacity: 0});
  const styles = {
  };

  const handleFlip = () => {
    if (flip.opacity === 0) {
      styles.opacity = 1
      styles.transform = `translateX(61vw)`
      setflip(styles)
    }
    else {
      styles.opacity = 0
      styles.transform = `translateX(-10%)`
      styles.zIndex = 0
      setflip(styles)
    }
  };

  return(
    // style={{position: 'relative', background: '#3e7cb1'}} for the grid container
    <div style={{height: '100vh', background: '#BD8B9C'}}>
    <Grid container>
      <Grid item className={classes.containerL}>
        <Button variant="contained" color="primary" className={classes.wrapBl} onClick={handleFlip}>Register</Button>
      </Grid>
      <Grid item className={classes.containerR} style={{...flip}}>
        <Paper>
          <BasicTabs/>
        </Paper>
      </Grid>
    </Grid>
    </div>

  )
}