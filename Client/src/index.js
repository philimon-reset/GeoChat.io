import React from 'react';
import ReactDOM from 'react-dom';
import App from './Pages/Landing/App';
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Home from './Pages/Home/home'
import {Login} from './Pages/Login/Entry'
import {Register} from './Pages/Login/Entry'

ReactDOM.render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App />}/>
    <Route path="/home" element={<Home />}/>
    <Route path="/login" element={<Login />}/>
    <Route path="/register" element={<Register />}/>
  </Routes>
</BrowserRouter>,
  document.getElementById('root')
);
