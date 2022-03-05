import React, { useState, createContext } from "react";

export const Context = createContext();

export const Provider = ({ children }) => {
  const [active, setactive] = useState({});

  const value = {
    active,
    setactive,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
