// import installed packages
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import styles
import "./App.css";
// import material ui items

// import shared/global items
import PrivateRoute from "./shared/PrivateRoute";
// import components/pages
import Header from "./components/common/Header";
// import Footer from "./components/common/Footer";
import Home from "./pages/Home/Home";
import Sidebar from "./components/common/Sidebar";
import Dashboard from "./pages/Dashboard";
import ActivateAccount from "./pages/ActivateAccount";
import ResetPasswordConfirm from "./pages/ResetPasswordConfirm";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import MyListings from "./pages/agent/MyListings/MyListings";
import ListingDetail from "./pages/ListingDetail/ListingDetail";

// import redux API
import { get_user } from "./redux/actions/auth";

function App() {
  const dispatch = useDispatch();
  const session_cookie = localStorage.getItem("session_cookie");

  useEffect(() => {
    // get user on page refresh
    if (session_cookie) {
      dispatch(get_user());
    }
  }, [dispatch, session_cookie]);

  return (
    <div id="body-pd">
      <Router>
        <Header />
        <Sidebar />
        <Switch>
          {/* unauthenticated routes */}
          <Route exact path="/listings/:listingId/" component={ListingDetail} />
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/user/password-reset/:password_token/"
            component={ResetPasswordConfirm}
          />
          <Route
            exact
            path="/user/activate/:activation_token/"
            component={ActivateAccount}
          />
          {/* authenticated routes */}
          <PrivateRoute exact path="/my-listings/" component={MyListings} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/dashboard/" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
