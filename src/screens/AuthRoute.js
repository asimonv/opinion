/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const AuthRoute = ({ component: Component, ...rest }) => {
  const currentUser = useSelector(({ auth: { user } }) => user);
  const location = useLocation();
  return (
    <Route
      {...rest}
      render={props => {
        if (currentUser) {
          return <Component {...props} />;
        }
        return (
          <Redirect
            to={{
              pathname: "/signin",
              state: {
                from: location,
              },
            }}
          />
        );
      }}
    />
  );
};

export default AuthRoute;
