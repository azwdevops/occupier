import * as actionTypes from "../actions/types";

const initialState = {
  listings: [],
};

const listingReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.NEW_LISTING:
      return {
        ...state,
        listings: [...state.listings, payload],
      };
    case actionTypes.SET_LISTINGS:
      return {
        ...state,
        listings: payload,
      };
    default:
      return state;
  }
};

export default listingReducer;
