import axios from "axios";

export async function logIn(creds) {
  try{
    const res = await axios.post("http://localhost:8000/login", creds, {
      withCredentials: true
    });
    return res;
  } catch(err) {
    return false;
  }
}

export async function logOut(){
  try {
    await axios.get("http://localhost:8000/logout", {
      withCredentials: true
    });
    return true;
  } catch (error) {
    return false;
  }
}

export async function checkSesh() {
  try {
    await axios.get("http://localhost:8000/isIn", {
      withCredentials: true
    });
    return true;
  } catch (error) {
    return false;
  }
}
