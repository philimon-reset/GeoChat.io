//external imports
import * as React from "react";

// Style imports
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { createStyles, makeStyles } from "@material-ui/core/styles";

// file
import { Register, Login } from "../../Login/Entry";

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
      // float: 'left',
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
      // float: 'left',
      backgroundColor: "#EFFFFD",
      height: "60vh",
      borderRadius: "15px",
      boxShadow: "0 3px 5px 2px rgba(33, 19, 13, .3)",
      width: "30%",
      position: "absolute",
      top: "5%",
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function BasicTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", margin: "2rem auto", position: "absolute" }}>
      <Box
        sx={{
          borderBottom: 2,
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Login" {...a11yProps(0)} />
          <Tab label="Register" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Login />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Register />
      </TabPanel>
    </Box>
  );
}
