import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
// import Home from './Pages/Home/home'
// import Register from './Pages/Register/register'
// import Login from './Pages/Login/login'

function App() {
  return (
    <div className="wrapper">
      <h1>Application</h1>
      <nav style={{ borderBottom: 'solid 1px', paddingBottom: '1rem' }}>
        <Link to="/home">Home</Link> |{' '}
        <Link to="/login">Login</Link> |{' '}
        <Link to="/register">Register</Link>
      </nav>
    </div>
  );
}

export default App;
