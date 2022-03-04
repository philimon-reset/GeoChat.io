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
const svg = {
  img: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%23303f9f' fill-opacity='1' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
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
            <div style={{ height: "100vh", background: "#2a363b", backgroundImage: svg.img  }}>
              <Grid container>
                <Grid className={classes.containerL}>
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
