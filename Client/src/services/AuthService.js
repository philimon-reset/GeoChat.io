import axios from "axios";

// check and return login credntitals
export async function logIn(creds) {
  try {
    const res = await axios.post("http://localhost:8000/login", creds, {
      withCredentials: true,
    });
    return res;
  } catch (err) {
    return false;
  }
}

// logout a user and destroy a session
export async function logOut() {
  try {
    await axios.get("http://localhost:8000/logout", {
      withCredentials: true,
    });
    return true;
  } catch (error) {
    return false;
  }
}

// check if session exists for user
export async function checkSesh() {
  try {
    const res = await axios.get("http://localhost:8000/isIn", {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    return false;
  }
}
