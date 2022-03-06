import axios from "axios";

// register a new user
export async function register(creds) {
  try {
    const res = await axios.post("http://localhost:8000/api/signup", creds, {
      withCredentials: true,
    });
    return res;
  } catch (err) {
    return err.response.data;
  }
}
