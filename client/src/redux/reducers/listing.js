import * as actionTypes from "../actions/types";

const initialState = {
  listings: [],
};

const listingReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
};

export default listingReducer;
