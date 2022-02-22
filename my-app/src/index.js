import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Pages/Landing/App';
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Home from './Pages/Home/home'
import {Login} from './Pages/Login/Entry'
import {Register} from './Pages/Login/Entry'
import reportWebVitals from './reportWebVitals';

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
