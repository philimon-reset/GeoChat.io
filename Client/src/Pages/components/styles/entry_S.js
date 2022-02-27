import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createStyles, makeStyles } from "@material-ui/core/styles";



export const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      width: '100%',
      height: '6rem',
      display: "flex",
      flexDirection: "column",
      position: "relative",
      borderRadius: '15px',
      boxShadow: '0 3px 5px 2px rgba(33, 19, 13, .3)'
    },
    container: {
      width: '70%',
      height: '0vh',
      border: '1px solid'
    },
    center: {
      margin: 'auto',
      width: '60%',
      padding: '20px'
    },
    wrapText : {
      margin: '5px'
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
        <Box sx={{ p: 2 }}>
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

export function BasicTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '25rem', margin: '2rem auto', position: 'absolute',right: '10rem'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-evenly' }}>
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