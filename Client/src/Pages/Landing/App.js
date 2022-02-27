import { Routes, Route, Link, Navigate } from "react-router-dom";
import { Register, Login } from '../Login/Entry'
import { BasicTabs, useStyles } from '../components/styles/entry_S'

function App() {
  const classes = useStyles();
  return (
      <div>
        <div className={classes.container}></div>
        <BasicTabs Login_C={<Login/>} Register_C={<Register/>}/>
      </div>
  );
}

export default App;
