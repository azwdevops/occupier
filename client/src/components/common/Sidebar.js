// import installed packages
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import styles
import "../../styles/components/common/Sidebar.css";
// import material ui items

// import shared/global items

// import components/pages

// import redux API
import { logout } from "../../redux/actions/auth";

const Sidebar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth?.loggedIn);

  return (
    <div className="left-navbar" id="nav-bar">
      <nav className="nav">
        <Link to="" className="nav__logo">
          <i className="bx bx-layer nav__logo-icon"></i>
          <span className="nav__logo-name">AZW</span>
        </Link>
        <div className="nav__list">
          {/* protected links */}
          {loggedIn && (
            <>
              <Link to="/dashboard/" className="nav__link active">
                <i className="bx bx-grid-alt nav__icon"></i>
                <span className="nav__name">Dashboard</span>
              </Link>
              <Link to="" className="nav__link">
                <i className="bx bx-user nav__icon"></i>
                <span className="nav__name">Users</span>
              </Link>
              <Link to="" className="nav__link">
                <i className="bx bx-message-square-detail nav__icon"></i>
                <span className="nav__name">Messages</span>
              </Link>
              <Link to="" className="nav__link">
                <i className="bx bx-bookmark nav__icon"></i>
                <span className="nav__name">Favorites</span>
              </Link>
              <Link to="" className="nav__link">
                <i className="bx bx-folder nav__icon"></i>
                <span className="nav__name">Data</span>
              </Link>
              <Link to="" className="nav__link">
                <i className="bx bx-bar-chart-alt-2 nav__icon"></i>
                <span className="nav__name">Analytics</span>
              </Link>
              <Link
                to=""
                className="nav__link"
                onClick={() => dispatch(logout(history))}
              >
                <i className="bx bx-log-out-circle"></i>
                <span className="nav__name">Logout</span>
              </Link>
            </>
          )}
          {/* unprotected links */}
          <>
            <Link to="/" className="nav__link">
              <i class="bx bx-home"></i>
              <span className="nav__name">Home</span>
            </Link>
          </>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
