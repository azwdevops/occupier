import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, session_cookie, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !session_cookie ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);

export default PrivateRoute;
