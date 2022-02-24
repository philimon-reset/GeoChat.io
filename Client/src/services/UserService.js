import axios from 'axios';


export async function register(creds) {
  try {
    await axios.post('http://127.0.0.1:8000/signup', creds);
    return true;
  } catch(err) {
    return false
  }
}
