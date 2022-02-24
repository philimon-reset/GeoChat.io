import axios from 'axios';


export default function register(creds) {
  return axios.post('/signup', creds);
}
