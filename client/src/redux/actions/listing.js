import * as api from "../../api";

import * as actionTypes from "../actions/types";

import globals from "../../shared/globals";

const { unknown_error } = globals;

// function to create new listing
export const create_new_listing = (userId, body, resetForm) => async (
  dispatch
) => {
  await api
    .createNewListing(userId, body)
    .then((res) => {
      dispatch({
        type: actionTypes.NEW_LISTING,
        payload: res.data?.new_listing,
      });
      alert(res.data?.detail);
      resetForm();
    })
    .catch((err) => {
      if (err.response?.status === 400 || err.response?.status === 401) {
        alert(err.response.data?.detail);
      } else {
        alert(unknown_error);
      }
    })
    .finally(() => {
      dispatch({ type: actionTypes.STOP_LOADING });
    });
};

// function to get new listings
export const get_listings = () => async (dispatch) => {
  await api
    .getListings()
    .then((res) => {
      dispatch({ type: actionTypes.SET_LISTINGS, payload: res.data?.listings });
    })
    .catch((err) => {
      console.log(err.response);
    })
    .finally(() => {
      dispatch({ type: actionTypes.STOP_LOADING });
    });
};
