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
import Home from "./pages/Home";
import Sidebar from "./components/common/Sidebar";
import Dashboard from "./pages/Dashboard";
import ActivateAccount from "./pages/ActivateAccount";

// import redux API
import { getuser } from "./redux/actions/auth";

function App() {
  const dispatch = useDispatch();
  const session_cookie = localStorage.getItem("session_cookie");

  useEffect(() => {
    // get user on page refresh
    if (session_cookie) {
      dispatch(getuser());
    }
  }, [dispatch, session_cookie]);

  return (
    <Router>
      <div id="body-pd">
        <Header />
        <Sidebar />
        <Switch>
          {/* unauthenticated routes */}
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/user/activate/:uid/:token/"
            component={ActivateAccount}
          />
          {/* authenticated routes */}
          <PrivateRoute
            exact
            path="/dashboard/"
            component={Dashboard}
            session_cookie={session_cookie}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
