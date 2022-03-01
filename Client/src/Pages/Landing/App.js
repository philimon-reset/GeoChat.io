import { Routes, Route, Link, Navigate } from "react-router-dom";
import { Register, Login } from '../Login/Entry'
import { BasicTabs, Landing } from '../components/styles/entry_S'

function App() {
  return (
      <div>
        <Landing Login_C={<Login/>} Register_C={<Register/>}/>
      </div>
  );
}

export default App;
