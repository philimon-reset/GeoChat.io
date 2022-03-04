// external imports
import React from "react";

import { useState, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// style imports
import { BasicTabs, useStyles } from "../components/styles/entry_S";
import { Paper, Grid, Button } from "@material-ui/core";

//file imports
import { checkSesh } from "../../services/AuthService";

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
  const [flip, setflip] = useState({ transform : `translateX(-10%)` });
  const styles = {};

  const handleFlip = () => {
    if (flip.transform === `translateX(-10%)`) {
      styles.transform = `translateX(61vw)`;
      setflip(styles);
    } else {
      styles.transform = `translateX(-10%)`;
      setflip(styles);
    }
  };

  return (
    // style={{position: 'relative', background: '#3e7cb1'}} for the grid container
    <>
      {state.loading ? (
        <p>loading.....</p>
      ) : (
        <>
          {state.hasSesh ? (
            navigate("home")
          ) : (
            <div style={{ height: "100vh", background: "#BD8B9C" }}>
              <Grid container>
                <Grid className={classes.containerL}>
                  <Button
                    variant="contained"
                    color="primary"
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
              </Grid>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default App;
