// import installed packages
import { useState, useEffect } from "react";
import { connect } from "react-redux";
// import styles

// import material ui items
import CircularProgress from "@material-ui/core/CircularProgress";
// import shared/global items
import globals from "../../shared/globals";
import { ifEmpty, resetFormValues } from "../../shared/sharedFunctions";
// import components/pages
import MediumDialog from "../common/MediumDialog";
// import redux API
import { CLOSE_SIGNUP, START_LOADING } from "../../redux/actions/types";
import {
  get_account_types_and_locations,
  signup_user,
} from "../../redux/actions/auth";
import { setAlert } from "../../redux/actions/shared";

const Signup = (props) => {
  const { loading, signupForm, alert, locations, account_types } = props; // get state from props
  const {
    startLoading,
    closeSignup,
    newAlert,
    signupUser,
    getAccountTypesLocations,
  } = props; // get dispatch actions from props

  // internal state
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
    location: "",
    account_type: "",
  });

  // get the locations/account types available from the backend
  useEffect(() => {
    if (locations?.length === 0 || account_types?.length === 0) {
      getAccountTypesLocations();
    }
  }, [locations?.length, account_types?.length, getAccountTypesLocations]);

  //############### destructuring code ###################//
  const {
    first_name,
    last_name,
    username,
    email,
    password,
    confirm_password,
    phone,
    location,
    account_type,
  } = newUser;
  const { error, fillFields } = globals;

  //#################end of destructuring ###########//

  const resetForm = () => {
    resetFormValues(newUser);
  };

  const closeSignupForm = () => {
    closeSignup();
    resetForm();
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (ifEmpty(newUser)) {
      return newAlert(error, fillFields);
    }
    // confirm passwords match
    if (password !== confirm_password) {
      return newAlert(error, "Passwords should match");
    }

    // dispatch the loading action
    startLoading();

    // call the signup action creator
    signupUser(newUser, resetForm);
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  return (
    <MediumDialog isOpen={signupForm}>
      <form className="dialog" id={loading ? "formSubmitting" : ""}>
        <h3>Create new account</h3>
        <p className={`response__message ${alert.alertType}`}>
          {alert.status && alert.detail}
        </p>
        <div className="dialog__row">
          <span>
            <label htmlFor="">First Name</label>
            <input
              type="text"
              name="first_name"
              value={first_name}
              onChange={handleChange}
              required
            />
          </span>
          <span>
            <label htmlFor="">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={last_name}
              onChange={handleChange}
              required
            />
          </span>
        </div>
        {loading && (
          <CircularProgress
            style={{ position: "absolute", marginLeft: "43%" }}
          />
        )}
        <div className="dialog__row">
          <span>
            <label htmlFor="">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
              required
            />
          </span>
          <span>
            <label htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              username={email}
              onChange={handleChange}
              required
            />
          </span>
        </div>
        <div className="dialog__row">
          <span>
            <label htmlFor="">Phone</label>
            <input
              type="number"
              name="phone"
              minLength="10"
              maxLength="10"
              value={phone}
              onChange={handleChange}
            />
          </span>
          <span>
            <label htmlFor="">Location</label>
            <select name="location" value={location} onChange={handleChange}>
              <option value="">Select location</option>
              {locations?.map((location, index) => (
                <option value={location} key={index}>
                  {location}
                </option>
              ))}
            </select>
          </span>
        </div>
        <div className="dialog__row">
          <span>
            <label htmlFor="">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </span>
          <span>
            <label htmlFor="">Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              value={confirm_password}
              onChange={handleChange}
              required
            />
          </span>
        </div>
        <div className="dialog__row">
          <span>
            <label htmlFor="">Account Type</label>
            <select
              name="account_type"
              value={account_type}
              onChange={handleChange}
            >
              <option value="">Select account type</option>
              {account_types?.map((account_type, index) => (
                <option value={account_type} key={index}>
                  {account_type}
                </option>
              ))}
            </select>
          </span>
        </div>
        <div className="form__Buttons">
          <button type="button" onClick={closeSignupForm}>
            Close
          </button>
          <button type="submit" onClick={handleSignup}>
            Sign Up
          </button>
        </div>
        <div className="extra__formButtons"></div>
      </form>
    </MediumDialog>
  );
};

const mapStateToProps = (state) => {
  return {
    signupForm: state.auth.signupForm,
    alert: state.shared?.alert,
    loading: state.shared?.loading,
    locations: state.auth.locations,
    account_types: state.auth.account_types,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startLoading: () => dispatch({ type: START_LOADING }),
    closeSignup: () => dispatch({ type: CLOSE_SIGNUP }),
    newAlert: (type, detail) => dispatch(setAlert(type, detail)),
    signupUser: (newUser, resetForm) =>
      dispatch(signup_user(newUser, resetForm)),
    getAccountTypesLocations: () => dispatch(get_account_types_and_locations()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
