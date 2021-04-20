import * as api from "../../api";

import * as actionTypes from "../actions/types";

import { showError, stopLoading } from "./shared";

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
    .catch((err) => showError(err))
    .finally(() => stopLoading(dispatch));
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

// function for tenant to book an appointment to view a house
export const tenant_book_appointment = (userId, body, resetForm) => async (
  dispatch
) => {
  await api
    .tenantBookAppointment(userId, body)
    .then((res) => {
      alert(res.data.detail);
      resetForm();
    })
    .catch((err) => showError(err))
    .finally(() => stopLoading(dispatch));
};
