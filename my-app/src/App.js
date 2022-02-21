import logo from './logo.svg';
import { Routes, Route, Link, Outlet } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </div>
  );
}
function Home() {
  return (
    <div>
      <h1>Bookkeeper</h1>
      <nav>
        <Link to="/about">Invoices</Link>
      </nav>
      <Outlet />
    </div>
  );
}

function About() {
  return (
    <>
      <h1>Welcome to React Router!</h1>
      <main>
        <h2>Who are we?</h2>
        <p>
          That feels like an existential question, don't you
          think?
        </p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}

export default App;
