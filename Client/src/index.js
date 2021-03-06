import React from "react";
import ReactDOM from "react-dom";
import { Route, Routes } from "react-router-dom";
import App from "./Pages/Landing/App";
import Home from "./Pages/Home/home";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="home" element={<Home />} />
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
