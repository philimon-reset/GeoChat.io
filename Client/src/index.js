import React from 'react';
import ReactDOM from 'react-dom';
import App from './Pages/Landing/App';
import Home from './Pages/Home/home'
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Home />
  </BrowserRouter>,
  document.getElementById('root')
);
