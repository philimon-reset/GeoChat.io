import { Routes, Route, Link, Navigate } from "react-router-dom";
import Home from '../Home/home';
import { Register, Login } from '../Login/Entry'
import useAuth from "../../hooks/useAuth";
import { AuthProvider } from "../AuthContext";


function RequireAuth({ children }) {
  const auth = useAuth();

  if (!auth.UsrData) {
    return <Navigate to='/login' replace />;
  }
  return children;
}

function Nav() {
  return(
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

function App() {
  return (
    <AuthProvider>
      <div>
        <Nav />
        <Routes>
          <Route path="/home" element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
