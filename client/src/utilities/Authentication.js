import axios from "axios";

axios.defaults.withCredentials = true;

export async function register(data) {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      data
    );
    const message = await res.data.message;
    alert(message);
  } catch (e) {
    console.error(e);
    alert("An error occur. Please try agian!");
  }
}

export async function checkLogin() {
  try {
    const res = await axios.get("http://localhost:5000/api/auth/login");
    const data = await res.data;
    return { user: data.user, status: data.status };
  } catch (e) {
    console.error(e);
  }
}

export async function login(data) {
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", data);
    const resData = await res.data;
    console.log(res);
    return resData;
  } catch (e) {
    console.error(e);
  }
}
