import axios from "axios";

export async function logIn(creds) {
  try{
    await axios.post("http://127.0.0.1:8000/login", creds);
    return true;
  } catch(err) {
    return false;
  }
}

export async function logOut(){
  try {
    await axios.get("/logout");
    return true;
  } catch (error) {
    return false;
  }
}
