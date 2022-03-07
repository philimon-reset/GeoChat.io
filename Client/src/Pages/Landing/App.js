// external imports
import React from "react";

import { useState, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// style imports
import { BasicTabs } from "../components/styles/Tab_Components";
import { useStyles, style } from "../components/styles/entry_S";
import { Paper, Grid, Button } from "@material-ui/core";

//file imports for auth services
import { checkSesh } from "../../services/AuthService";

// reducer to check auth state
const reducer = (state, action) => {
  switch (action) {
    case "SUCCESS":
      return {
        error: null,
        hasSesh: true,
        loading: false,
      };
    case "ERROR":
      return {
        error: true,
        hasSesh: false,
        loading: false,
      };
    default:
      return state;
  }
};

// landing page
function App() {
  const navigate = useNavigate();

  // checksesh handler
  const [state, dispatch] = useReducer(reducer, {
    error: null,
    hasSesh: null,
    loading: true,
  });

  useEffect(() => {
    checkSesh().then((res) => {
      if (res) {
        dispatch("SUCCESS");
      } else {
        dispatch("ERROR");
      }
    });
  }, []);

  // style handlers
  const classes = useStyles();
  const [flip, setflip] = useState({ transform: `translateX(0%)` });
  const styles = {};

  const handleFlip = () => {
    if (flip.transform === `translateX(0%)`) {
      styles.transform = `translateX(58vw)`;
      setflip(styles);
    } else {
      styles.transform = `translateX(0%)`;
      setflip(styles);
    }
  };

  return (
    <>
      {state.loading ? (
        <p>loading.....</p>
      ) : (
        <>
          {state.hasSesh ? (
            navigate("home")
          ) : (
            <div style={{ ...style }}>
              <Grid className={classes.containerL}>
                <div className={classes.introText}>
                  <h1 style={{background: '#5D8BF4', borderRadius: '15px', color: 'white'}}>GeoChat</h1>
                  <h6 style={{borderLeft: '5px solid', color: '#203239'}}>GeoChat is an instant messaging app with a location feature.<br/>
                  Real-time conversations new and exciting people around your vicinity.</h6>
                </div>
                <Button
                  variant="contained"
                  className={classes.wrapBl}
                  onClick={handleFlip}
                >
                  Get Started
                </Button>
              </Grid>
              <Grid className={classes.containerR} style={{ ...flip }}>
                <Paper>
                  <BasicTabs />
                </Paper>
              </Grid>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default App;
