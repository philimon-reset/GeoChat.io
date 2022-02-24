import React from "react";
import { AuthContext } from "../Pages/AuthContext";


export default function useAuth() {
  return React.useContext(AuthContext);
}
