import { v4 as uuid } from "uuid";
import * as actionTypes from "./types";

import globals from "../../shared/globals";

const { unknown_error } = globals;

export const setAlert = (alertType, detail) => async (dispatch) => {
  // set alert
  // alertType is either success or error
  // detail is the message
  dispatch({
    type: actionTypes.SET_ALERT,
    payload: { status: true, alertType, detail },
  });

  // remove alert after 3 seconds
  setTimeout(() => {
    dispatch({
      type: actionTypes.REMOVE_ALERT,
      payload: { status: false, alertType: "", detail: "" },
    });
  }, 3000);
};

// START OF reusable functions
// show error function
export const showError = (err) => {
  if (err.response.status === 400 || err.response.status === 401) {
    alert(err.response.data?.detail);
  } else {
    alert(unknown_error);
  }
};
export const stopLoading = (dispatch) => {
  dispatch({ type: actionTypes.STOP_LOADING });
};

// END OF REUSABLE FUNCTIONS
