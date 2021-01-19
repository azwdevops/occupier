// types import
import {
  CLOSE_SIGNUP,
  OPEN_LOGIN,
  OPEN_SIGNUP,
  CLOSE_LOGIN,
  AUTH_SUCCESS,
  LOGOUT,
} from "../actions/types";

const initialState = {
  signupForm: false,
  loginForm: false,
  loggedIn: false,
  user: {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
  },
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case OPEN_SIGNUP:
      return {
        ...state,
        signupForm: true,
      };
    case CLOSE_SIGNUP:
      return {
        ...state,
        signupForm: false,
      };
    case OPEN_LOGIN:
      return {
        ...state,
        loginForm: true,
      };
    case CLOSE_LOGIN:
      return {
        ...state,
        loginForm: false,
      };
    case AUTH_SUCCESS:
      return { ...state, user: payload, loggedIn: true };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
