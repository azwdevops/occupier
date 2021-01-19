import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("session_cookie")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem(
      "session_cookie"
    )}`;
  }
  return req;
});

// user routes
export const signUp = (newUser) => API.post("/api/user/signup/", newUser);
export const activateUser = (uid, token) =>
  API.post("/api/auth/users/activation/", { uid, token }); // djoser url
export const signIn = (loginData) => API.post("/api/user/login/", loginData);
export const getUser = () => API.get("/api/user/get-user-data/");
