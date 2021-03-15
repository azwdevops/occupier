// import installed packages
import { Link, useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";

// import styles
import "../../styles/components/common/Sidebar.css";
// import material ui items

// import shared/global items

// import components/pages

// import redux API
import { logout } from "../../redux/actions/auth";

const Sidebar = (props) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const { loggedIn, account_type } = props; // get state from props
  const { logoutUser } = props; // get dispatch actions from props

  return (
    <div className="left-navbar" id="nav-bar">
      <nav className="nav">
        <Link to="" className="nav__logo">
          <i className="bx bx-layer nav__logo-icon"></i>
          <span className="nav__logo-name">AZW</span>
        </Link>
        <div className="nav__list">
          {/* unprotected links */}
          <>
            <Link
              to="/"
              className={
                `${pathname}` === "/" ? "nav__link active" : "nav__link"
              }
            >
              <i class="bx bx-home"></i>
              <span className="nav__name">Home</span>
            </Link>
          </>
          {/* protected links */}
          {loggedIn && (
            <>
              <>
                {/* LINKS TO BE ACCESSED BY AGENT */}
                {account_type === "agent" && (
                  <>
                    <Link
                      to="/my-listings/"
                      className={
                        `${pathname}` === "/dashboard/"
                          ? "nav__link active"
                          : "nav__link"
                      }
                    >
                      <i class="bx bx-list-ul nav__icon"></i>
                      <span className="nav__name">My Listings</span>
                    </Link>
                  </>
                )}
              </>
              <>
                <Link
                  to="/dashboard/"
                  className={
                    `${pathname}` === "/dashboard/"
                      ? "nav__link active"
                      : "nav__link"
                  }
                >
                  <i className="bx bx-grid-alt nav__icon"></i>
                  <span className="nav__name">Dashboard</span>
                </Link>
                <Link
                  to="/profile/"
                  className={
                    `${pathname}` === "/profile/"
                      ? "nav__link active"
                      : "nav__link"
                  }
                >
                  <i class="bx bx-user nav__icon"></i>
                  <span className="nav__name">Profile</span>
                </Link>
                <Link
                  to=""
                  className="nav__link"
                  onClick={() => logoutUser(history)}
                >
                  <i className="bx bx-log-out-circle"></i>
                  <span className="nav__name">Logout</span>
                </Link>
              </>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    account_type: state.auth.user.account_type,
    loggedIn: state.auth.loggedIn,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: (history) => dispatch(logout(history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
