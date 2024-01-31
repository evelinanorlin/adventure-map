import axios from "axios";

export async function checkLogin(name: string, pass: string) {
  const BASE_URL = import.meta.env.VITE_APP_URL;
  const url = `${BASE_URL}login`;

  const response = await axios.post(url, {
    username: name,
    password: pass,
  });
  return response.data;
}
