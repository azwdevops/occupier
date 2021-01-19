// import installed packages
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";

// import styles

// import material ui items
import CircularProgress from "@material-ui/core/CircularProgress";
// import shared/global items
import globals from "../../shared/globals";
import { ifEmpty } from "../../shared/sharedFunctions";
// import components/pages
import MinDialog from "../common/MinDialog";

// import redux API
import {
  CLOSE_LOGIN,
  OPEN_FORGOT_PASSWORD,
  OPEN_RESEND_ACTIVATION,
  OPEN_SIGNUP,
  START_LOADING,
} from "../../redux/actions/types";
import { setAlert } from "../../redux/actions/shared";
import { login } from "../../redux/actions/auth";

const Login = () => {
  const dispatch = useDispatch();
  const loginForm = useSelector((state) => state.auth?.loginForm);
  const loading = useSelector((state) => state.shared?.loading);
  const alert = useSelector((state) => state.shared?.alert);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // refs
  const btnRef = useRef();
  const formRef = useRef();

  // destructuring
  const { error } = globals;
  const { email, password } = loginData;

  const handleLogin = (e) => {
    e.preventDefault();
    if (ifEmpty(loginData)) {
      return dispatch(setAlert(error, "Email and password required"));
    }
    if (btnRef.current) {
      formRef.current.setAttribute("id", "pageSubmitting");
    }
    // dispatch loading action to allow spinner and setting attribute
    dispatch({ type: START_LOADING });
    // call the signup action creator
    dispatch(login(loginData));
    if (!loading) {
      if (btnRef.current) {
        formRef.current.removeAttribute("id", "pageSubmitting");
      }
    }
  };

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  return (
    <MinDialog isOpen={loginForm}>
      <form className="dialog" ref={formRef}>
        <h3>Login here</h3>
        <p className={`response__message ${alert.alertType}`}>
          {alert.status && alert.msg}
        </p>
        <div className="dialog__rowSingleItem">
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={email}
          />
        </div>
        {loading && (
          <CircularProgress
            style={{ position: "absolute", marginLeft: "40%" }}
          />
        )}
        <div className="dialog__rowSingleItem">
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={password}
          />
        </div>
        <div className="form__Buttons">
          <button type="button" onClick={() => dispatch({ type: CLOSE_LOGIN })}>
            Close
          </button>
          <button type="submit" onClick={handleLogin} ref={btnRef}>
            Login
          </button>
        </div>
        <div className="extra__formButtons">
          <label
            htmlFor=""
            className="button"
            onClick={() => dispatch({ type: OPEN_FORGOT_PASSWORD })}
          >
            Forgot Password
          </label>
          <label
            htmlFor=""
            className="button"
            style={{ justifySelf: "end" }}
            onClick={() => dispatch({ type: OPEN_SIGNUP })}
          >
            Create Account
          </label>
        </div>
        <div className="extra__formButtons">
          <label
            htmlFor=""
            className="button"
            onClick={() => dispatch({ type: OPEN_RESEND_ACTIVATION })}
          >
            Resend Activation
          </label>
        </div>
      </form>
    </MinDialog>
  );
};

export default Login;
