import * as api from "../../api";

import * as actionTypes from "../actions/types";

// function to create new listing
export const create_new_listing = (body, resetForm) => async (dispatch) => {
  await api
    .createNewListing(body)
    .then((res) => {})
    .catch((err) => {})
    .finally(() => {
      dispatch({ type: actionTypes.STOP_LOADING });
    });
};
