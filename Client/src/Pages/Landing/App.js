import { Routes, Route, Link } from "react-router-dom";
import { Register, Login } from '../Login/Entry'


function Nav() {
  return(
    <div className="wrapper">
    <h1>Application</h1>
    <nav style={{ borderBottom: 'solid 1px', paddingBottom: '1rem' }}>
      <Link to="/login">Login</Link> |{' '}
      <Link to="/register">Register</Link>
    </nav>
  </div>
  );
}

function App() {
  return (
      <div>
        <Nav />
        <Routes>
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/register" element={<Register />}/>
        </Routes>
      </div>
  );
}

export default App;
