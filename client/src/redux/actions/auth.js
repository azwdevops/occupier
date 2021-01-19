// axios items
import * as api from "../../api/index";

// redux API items

import {
  AUTH_SUCCESS,
  CLOSE_LOGIN,
  CLOSE_SIGNUP,
  LOGOUT,
  STOP_LOADING,
} from "../actions/types";
import { setAlert } from "./shared";

// shared items
import globals from "../../shared/globals";

const { error, success } = globals;

// sign up user
export const signup = (newUser) => async (dispatch) => {
  try {
    // destructure the payload got from the request
    const { data } = await api.signUp(newUser);
    // dispatch success message
    dispatch({ type: AUTH_SUCCESS, payload: data?.user });
    dispatch(setAlert(success, data?.msg));
    setTimeout(() => {
      dispatch({ type: CLOSE_SIGNUP });
    }, 3000);
  } catch (err) {
    // if bad client request
    if (err.response?.status === 400) {
      dispatch(setAlert(error, err.response.data?.msg));
    } else {
      console.log(err);
    }
  } finally {
    // dispatch the stop loading action
    dispatch({ type: STOP_LOADING });
  }
};

// activate user account
export const activateAccount = (body) => async (dispatch) => {
  const { uid, token, history } = body;
  try {
    // destructure the payload got from the request
    const { data } = await api.activateUser(uid, token);
    alert("Account activated successfully");
  } catch (err) {
    if (err.response.data?.token[0] === "Invalid token for given user.") {
      alert("Invalid activation token");
    } else if (
      err.response.data?.uid[0] === "Invalid user id or user doesn't exist."
    ) {
      alert("Invalid activation link");
    } else {
      alert("An error occurred, please try again later.");
    }
  } finally {
    dispatch({ type: STOP_LOADING });
    history.replace("/");
  }
};

// login user
export const login = (loginData) => async (dispatch) => {
  try {
    // destructure the payload got from the request
    const { data } = await api.signIn(loginData);
    localStorage.setItem("session_cookie", data?.access);
    // dispatch success message
    dispatch({ type: AUTH_SUCCESS, payload: data?.user });
    dispatch({ type: CLOSE_LOGIN });
  } catch (err) {
    if (err.response?.status === 400) {
      dispatch(setAlert(error, err.response?.data.msg));
    } else if (err.response?.status === 401) {
      dispatch(
        setAlert(error, "Invalid login, ensure your account is activated")
      );
    } else {
      console.log(err);
    }
  } finally {
    // dispatch the stop loading action
    dispatch({ type: STOP_LOADING });
  }
};

// get user data
export const getuser = () => async (dispatch) => {
  try {
    // destructure the payload got from the request
    const { data } = await api.getUser();
    // dispatch success message
    dispatch({ type: AUTH_SUCCESS, payload: data?.user });
  } catch (error) {
    dispatch({ type: LOGOUT });
    localStorage.clear();
    console.log(error);
  }
};

// logout user
export const logout = (history) => async (dispatch) => {
  localStorage.clear();
  dispatch({ type: LOGOUT });
  history.replace("/");
};
