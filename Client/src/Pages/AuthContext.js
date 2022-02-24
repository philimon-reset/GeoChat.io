import React from "react";
import { logIn, logOut } from "../services/AuthService";
import { register } from "../services/UserService";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [UsrData, setUsrData] = React.useState(null);

  const signIn = async (creds) => {
    const res = await logIn(creds)
    if (res) {
      setUsrData(creds)
    }
    return res;
  }

  const signOut = async () => {
    const res = await logOut();
    if (res) {
      setUsrData(null);
    }
    return res;
  }

  const signUp = async (creds) => {
    const res = await register(creds);
    if (res) {
      setUsrData(creds);
    }
    return res;
  }

  let auth = {UsrData, signIn, signOut, signUp}

  return <AuthContext.Provider value={auth}>{ children }</AuthContext.Provider>;
}

