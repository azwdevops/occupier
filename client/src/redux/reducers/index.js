import { combineReducers } from "redux";

import auth from "./auth";
import shared from "./shared";
import listing from "./listing";

export default combineReducers({
  auth,
  shared,
  listing,
});
