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

// SVG i don't know where to put
const style = {
  height: "102vh",
  background: "hsla(148, 89%, 78%, 1)",
  background:
    "linear-gradient(90deg, hsla(148, 89%, 78%, 1) 0%, hsla(210, 81%, 22%, 1) 100%)",
  background:
    "-moz-linear-gradient(90deg, hsla(148, 89%, 78%, 1) 0%, hsla(210, 81%, 22%, 1) 100%)",
  background:
    "-webkit-linear-gradient(90deg, hsla(148, 89%, 78%, 1) 0%, hsla(210, 81%, 22%, 1) 100%)",
  filter:
    'progid: DXImageTransform.Microsoft.gradient( startColorstr="#95F9C3", endColorstr="#0B3866", GradientType=1 )',
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
  const [flip, setflip] = useState({ transform: `translateX(0%)` });
  const styles = {};

  const handleFlip = () => {
    if (flip.transform === `translateX(0%)`) {
      styles.transform = `translateX(55vw)`;
      setflip(styles);
    } else {
      styles.transform = `translateX(0%)`;
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
            <div style={{ ...style }}>
              <Grid container>
                <Grid className={classes.containerL}>
                  <div className={classes.introText}>
                    lorem ipsum lorem ipsum lorem ipsum lorem lorem ipsum
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
              </Grid>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default App;
