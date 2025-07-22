import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux"

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const access = useSelector((state) => state.userReducer?.userId.access);

  return (
    <Route
      {...rest}
      render={routeProps =>
        access==="Admin" ? (
          <RouteComponent {...routeProps} />
        ) : (
          <div>
          <Redirect to={"/"} />
          {alert("debes ser Admin")}
          </div>
        )}
    />
  );
};


export default PrivateRoute