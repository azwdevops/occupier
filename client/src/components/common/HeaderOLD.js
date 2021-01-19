// import installed packages
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
// import styles
import "../../styles/components/Header.css";
// import material ui items
import Avatar from "@material-ui/core/Avatar";

// import shared/global items

// import components/pages
import Login from "../users/Login";
import Signup from "../users/Signup";

// import redux API
import {
  AUTH_SUCCESS,
  OPEN_LOGIN,
  OPEN_SIGNUP,
} from "../../redux/actions/types";

const Header = () => {
  const dispatch = useDispatch();
  const user = {
    name: "azw",
  };

  const googleSucess = async (res) => {
    console.log(res);
    // extract the details from this user object to send to the signup body
    const user = res?.profileObj;
    // const token = res?.tokenId;
    // after getting the google results send this to server to create an account

    // only dispatch auth success after successful signup
  };
  const googleFailure = (error) => {
    console.log(error);
  };

  return (
    <>
      <nav className="header__section">
        <div className="header__left">
          <Link to="/">
            <h1>MERN Auth</h1>
          </Link>
        </div>
        <div className="header__center">
          <h4>Middle section</h4>
        </div>
        {!user ? (
          <div className="header__right authenticated">
            <>
              <div>
                <Avatar
                  alt={user.name}
                  src={user.imageUrl}
                  className="user__image"
                >
                  {user.name.charAt(0)}
                </Avatar>
                <h6>{user.name}</h6>
                <i className="fa fa-caret-down"></i>
              </div>
              <ul className="dropdown">
                <li>Profile</li>
                <li>Logout</li>
              </ul>
            </>
          </div>
        ) : (
          <div className="header__right">
            <span
              className="button"
              onClick={() => dispatch({ type: OPEN_LOGIN })}
            >
              Login
            </span>
            <span
              className="button"
              onClick={() => dispatch({ type: OPEN_SIGNUP })}
            >
              Signup
            </span>
          </div>
        )}
      </nav>
      {/* components */}
      <Login />
      <Signup googleSucess={googleSucess} googleFailure={googleFailure} />
    </>
  );
};

export default Header;
