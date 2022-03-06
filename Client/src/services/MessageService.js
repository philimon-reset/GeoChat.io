import axios from "axios";

// temporary function to get a list of messages for the users communicating
export async function getMessages(from, to) {
  try {
    const data = axios.post(
      "http://localhost:8000/api/getMessages",
      { from, to },
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (err) {
    return false;
  }
}
