import axios from "axios";

export async function getMessages(from, to) {
  try{
    const data = axios.post("http://localhost:8000/getMessages", {from, to}, {
      withCredentials: true
    });
    return data;
  } catch(err) {
    return false;
  }
}